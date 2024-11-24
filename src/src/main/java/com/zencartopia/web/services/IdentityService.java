package com.zencartopia.web.services;

import com.zencartopia.web.models.User;
import com.zencartopia.web.request.LoginRequest;
import com.zencartopia.web.response.AuthResponse;
import org.springframework.http.ResponseEntity;

public interface IdentityService {
    ResponseEntity<AuthResponse> registerUser(User user);
    ResponseEntity<AuthResponse> loginUser(LoginRequest loginRequest);
    void logoutUser(String token);
    User getUserProfile(Long userId);
    User updateUserProfile(Long userId, User user);
}
