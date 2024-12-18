package com.zencartopia.web.services.impl;

import com.zencartopia.web.models.PaymentInformation;
import com.zencartopia.web.models.User;
import com.zencartopia.web.repositories.UserRepository;
import com.zencartopia.web.repositories.PaymentRepository;
import com.zencartopia.web.request.LoginRequest;
import com.zencartopia.web.response.AuthResponse;
import com.zencartopia.web.services.IdentityService;
import config.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.sql.Timestamp;
import java.util.List;

@Service
public class IdentityServiceImpl implements IdentityService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    private JwtProvider jwtProvider;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public IdentityServiceImpl(UserRepository userRepository, PaymentRepository paymentRepository, BCryptPasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Username or Email already in use");
        }

        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Handle payment information
        if (user.getPaymentInformation() != null) {
            // Save the payment information
            PaymentInformation payment = user.getPaymentInformation();
            paymentRepository.save(payment);  // Save payment first

            // Associate the payment with the user
            user.setPaymentInformation(payment);
        }

        // Save the user
        User newUser = userRepository.save(user);

        // Generate JWT token
        Authentication authentication = new UsernamePasswordAuthenticationToken(newUser.getEmail(), newUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        // Return successful response with the token
        AuthResponse authResponse = new AuthResponse(token, "SignUp Success");
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }



    @Override
    public ResponseEntity<AuthResponse> loginUser(LoginRequest loginRequest) {
        String userName = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(userName, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "SignIn Success");
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password) {
        User userPresent = userRepository.findByEmail(userName);

        if (userPresent == null) {
            throw new BadCredentialsException("Invalid UserName");
        }

        if (!passwordEncoder.matches(password, (userPresent.getPassword()))) {
            throw new BadCredentialsException("Invalid Password");
        }

        // Check if the role is null and assign a default role if necessary
        String role = userPresent.getRole();
        if (role == null) {
            role = "ROLE_USER"; // Assign a default role if none is found
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;  // Add prefix if it's missing
        }

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

        return new UsernamePasswordAuthenticationToken(userPresent, null, authorities);
    }

    @Override
    public void logoutUser(String token) {
        // Clear the session
        SecurityContextHolder.clearContext();

        // Optionally, invalidate any session-related data if using HttpSession
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    @Override
    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Override
    public User updateUserProfile(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Update fields (e.g., email, password) as needed
        if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null) user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userPresent = userRepository.findByEmail(username);

        if (userPresent == null) {
            throw new UsernameNotFoundException("User not found with username or email: " + username);
        }
        // Convert the User entity to a Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User.builder()
                .username(userPresent.getUsername())
                .password(userPresent.getPassword())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
