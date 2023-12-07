package io.cproject.backend.mapper;

import io.cproject.backend.dto.response.OrderResponseDTO;
import io.cproject.backend.dto.response.ServicesResponseDTO;
import io.cproject.backend.dto.response.ShoesResponseDTO;
import io.cproject.backend.model.Cart;
import io.cproject.backend.model.Order;
import io.cproject.backend.model.Services;
import io.cproject.backend.model.Shoes;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class OrderDTOMapper implements Function<Order, OrderResponseDTO> {
    private final ShoesDTOMapper shoesDTOMapper;
    private final ServicesDTOMapper servicesDTOMapper;

    public OrderDTOMapper(ShoesDTOMapper shoesDTOMapper, ServicesDTOMapper servicesDTOMapper) {
        this.shoesDTOMapper = shoesDTOMapper;
        this.servicesDTOMapper = servicesDTOMapper;
    }

    @Override
    public OrderResponseDTO apply(Order order) {
        ShoesResponseDTO shoesResponseDTO = null;
        ServicesResponseDTO servicesResponseDTO = null;

        Cart cart = order.getCart();
        if (cart != null) {
            Shoes shoes = cart.getShoes();
            if (shoes != null) {
                shoesResponseDTO = shoesDTOMapper.toDto(shoes, cart.getMeasurements());
            }

            Services service = cart.getService();
            if (service != null) {
                servicesResponseDTO = servicesDTOMapper.toDto(service);
            }
        }

        return new OrderResponseDTO(
                order.getId(),
                order.getNumberOrder(),
                order.getCart().getId(),
                order.getUser().getId(),
                order.getDateCreate(),
                order.getDateEnd(),
                order.getPhotoBefore(),
                order.getPhotoAfter(),
                order.getStatus().getId(),
                order.getExpress(),
                shoesResponseDTO,
                servicesResponseDTO
        );
    }
}