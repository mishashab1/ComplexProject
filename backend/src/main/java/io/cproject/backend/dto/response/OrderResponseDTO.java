package io.cproject.backend.dto.response;

import java.util.Date;

public record OrderResponseDTO(
        Long id,
        Long numberOrder,
        Long cartId,
        Long userId,
        Date createDate,
        Date endDate,
        String photoBefore,
        String photoAfter,
        Integer statusId,
        Boolean express,
        ShoesResponseDTO shoes,
        ServicesResponseDTO services
){}
