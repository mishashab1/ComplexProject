package io.cproject.backend.dto.response.request;

public record AuthRequest(
    String email,
    String firstName,
    String password,
    String phone
) { }
