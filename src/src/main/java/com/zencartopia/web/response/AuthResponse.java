package com.zencartopia.web.response;

public class AuthResponse {
    private String token;
    private String message;

    // Default constructor
    public AuthResponse() {}

    // Constructor, getters, and setters
    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

