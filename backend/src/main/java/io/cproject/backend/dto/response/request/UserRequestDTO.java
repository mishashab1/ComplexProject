package io.cproject.backend.dto.response.request;

public record UserRequestDTO(
        String firstName,
        String lastName,
        String surname,
        String email,
        String phone,
        String password,
        Long role_id
) {}
