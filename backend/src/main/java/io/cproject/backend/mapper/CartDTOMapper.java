package io.cproject.backend.mapper;

import io.cproject.backend.dto.response.CartResponse;
import io.cproject.backend.dto.response.ServicesResponseDTO;
import io.cproject.backend.dto.response.ShoesResponseDTO;
import io.cproject.backend.model.Cart;
import io.cproject.backend.model.Services;
import io.cproject.backend.model.Shoes;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CartDTOMapper implements Function<Cart, CartResponse> {
    @Override
    public CartResponse apply(Cart cart) {
        Services services = cart.getService();
        Shoes shoes = cart.getShoes();

        return new CartResponse(
                cart.getId(),
                services == null ? null : new ServicesResponseDTO(
                        services.getId(),
                        services.getName(),
                        services.getPrice()
                ),
                shoes == null ? null : new ShoesResponseDTO(
                        shoes.getId(),
                        shoes.getPrice(),
                        shoes.getColor(),
                        shoes.getMaterial(),
                        shoes.getTypeShoes().getId(),
                        shoes.getName(),
                        shoes.getPhoto(),
                        cart.getMeasurements()
                )
        );
    }
}
