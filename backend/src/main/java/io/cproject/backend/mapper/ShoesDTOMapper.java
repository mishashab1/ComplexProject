package io.cproject.backend.mapper;

import io.cproject.backend.dto.response.ShoesResponseDTO;
import io.cproject.backend.model.Shoes;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ShoesDTOMapper implements Function<Shoes, ShoesResponseDTO> {
    public ShoesResponseDTO toDto(Shoes shoes, String measurements) {
        if (shoes == null) {
            return null;
        }
        return new ShoesResponseDTO(
                shoes.getId(),
                shoes.getPrice(),
                shoes.getColor(),
                shoes.getMaterial(),
                shoes.getTypeShoes().getId(),
                shoes.getName(),
                shoes.getPhoto(),
                measurements
        );
    }
    @Override
    public ShoesResponseDTO apply(Shoes shoes) {
        throw new UnsupportedOperationException("apply method is not supported without measurements");
    }
}