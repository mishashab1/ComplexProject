package io.cproject.backend.dto.response;

public record CartResponse(
        Long id,
        ServicesResponseDTO services,
        ShoesResponseDTO shoes
){}


