package io.cproject.backend.dto.response;

public record ShoesResponseDTO(
        Long id,
        Integer price,
        String color,
        String material,
        Long typeShoesId,
        String name,
        String photo,
        String measurements // добавлено
) {}
