package io.cproject.backend.service;

import io.cproject.backend.dto.response.CartResponse;
import io.cproject.backend.dto.response.request.CartRequestDTO;
import io.cproject.backend.mapper.CartDTOMapper;
import io.cproject.backend.mapper.ServicesDTOMapper;
import io.cproject.backend.mapper.ShoesDTOMapper;
import io.cproject.backend.model.Cart;
import io.cproject.backend.model.Shoes;
import io.cproject.backend.model.Services;
import io.cproject.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ShoesRepository shoesRepository;
    private final ServiceRepository serviceRepository;
    private final CartDTOMapper cartDTOMapper;

    private final ShoesDTOMapper shoesDTOMapper;
    private final ServicesDTOMapper serviceDTOMapper;

    public Cart addServiceToCart(CartRequestDTO request) {
        var user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("user not found"));
        Services service = serviceRepository.findById(request.serviceId())
                .orElseThrow(() -> new RuntimeException("service not found"));
        var cart = Cart.builder()
                .service(service)
                .user(user)
                .orderCreate(false)
                .build();
        return cartRepository.save(cart);
    }

    //

    public Cart addShoesToCart(CartRequestDTO request) {
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("user not found"));
        Shoes shoes = shoesRepository.findById(request.getShoesId())
                .orElseThrow(() -> new RuntimeException("shoes not found"));
        var cart = Cart.builder()
                .user(user)
                .shoes(shoes)
                .measurements(request.getMeasurements()) // Установить значение measurements
                .orderCreate(false)
                .build();
        return cartRepository.save(cart);
    }


    //

    private final UserCartRepository userCartRepository;
    public List<CartResponse> getCartByUserId(Long userId) {
        return userCartRepository.findAllByUserIdAndOrderCreateIsFalse(userId)
                .stream()
                .map(cartDTOMapper)
                .collect(Collectors.toList());
    }

    //

    public Integer getTotalPriceByUserId(Long userId) {
        List<Cart> carts = userCartRepository.findAllByUserIdAndOrderCreateIsFalse(userId);
        int totalPrice = carts.stream()
                .mapToInt(cart -> {
                    int servicePrice = cart.getService() != null ? cart.getService().getPrice() : 0;
                    int shoesPrice = cart.getShoes() != null ? cart.getShoes().getPrice() : 0;
                    return servicePrice + shoesPrice;
                }).sum();
        return totalPrice;
    }

    //

    public void removeFromCartById(Long itemId) {
        Optional<Cart> cartToRemove = userCartRepository.findById(itemId);
        cartToRemove.ifPresent(userCartRepository::delete);
    }

    //

    public int getNumberOfItemsInCart(Long userId, boolean orderCreate) {
        return cartRepository.countByUserIdAndOrderCreate(userId, orderCreate);
    }
}
