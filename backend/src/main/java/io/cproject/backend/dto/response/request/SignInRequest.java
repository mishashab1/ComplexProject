package io.cproject.backend.dto.response.request;

public record SignInRequest(
        String email,
        String password
) { }
