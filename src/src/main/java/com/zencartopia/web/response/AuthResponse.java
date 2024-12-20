package com.zencartopia.web.response;

public class AuthResponse {
    private int id;
    private String token;
    private String message;

    // Default constructor
    public AuthResponse() {}

    // Constructor, getters, and setters
    public AuthResponse(int id, String token, String message) {
        this.id = id;
        this.token = token;
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

