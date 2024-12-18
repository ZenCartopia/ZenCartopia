package com.zencartopia.web.controllers;

import com.zencartopia.web.models.User;
import com.zencartopia.web.request.LoginRequest;
import com.zencartopia.web.response.AuthResponse;
import com.zencartopia.web.services.IdentityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/identity")
public class  IdentityController {

    private final IdentityService identityService;

    @Autowired
    public IdentityController(IdentityService identityService) {
        this.identityService = identityService;
    }

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            identityService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User registration failed: " + e.getMessage());
        }
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            ResponseEntity<AuthResponse> authResponse = identityService.loginUser(loginRequest);

            System.out.println(authResponse.toString());
            return authResponse;
        } catch (Exception e) {
            AuthResponse authResponse = new AuthResponse("", "Login failed: " + e.getMessage() );
            return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
        }
    }

   //  Endpoint for user logout
   @PostMapping("/logout")
   public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String token) {
       try {
           // Remove the "Bearer " prefix from the token if it's present
           if (token.startsWith("Bearer ")) {
               token = token.substring(7);
           }

           // Call the logoutUser service method to blacklist the token (or clear the session)
           identityService.logoutUser(token);

           // Return success message
           return ResponseEntity.ok("User logged out successfully");
       } catch (Exception e) {
           // Return error message if logout fails
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Logout failed: " + e.getMessage());
       }
   }

//
//    // Endpoint to get user profile
//    @GetMapping("/profile")
//    public ResponseEntity<User> getUserProfile(@RequestParam Long id) {
//        try {
//            User user = identityService.getUserProfile(id);
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }

    // Endpoint to update user profile
//    @PutMapping("/profile")
//    public ResponseEntity<String> updateUserProfile(@RequestParam Long id, @RequestBody User user) {
//        try {
//            identityService.updateUserProfile(id, user);
//            return ResponseEntity.ok("User profile updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile update failed: " + e.getMessage());
//        }
//    }
}