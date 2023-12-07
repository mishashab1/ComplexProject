package io.cproject.backend.service;
import io.cproject.backend.model.Cart;
import io.cproject.backend.model.Order;
import io.cproject.backend.model.enums.StatusName;
import io.cproject.backend.repository.CartRepository;
import io.cproject.backend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OrderServices {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    @Transactional
    public void saveOrder(Long userId, boolean express) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        Long nextOrderNumber = getNextOrderNumber();

        for (Cart cartItem : cartItems) {
            if (!cartItem.getOrderCreate()) { // Добавляем проверку на order_create
                Order order = new Order();
                order.setCart(cartItem);
                order.setUser(cartItem.getUser());
                order.setStatus(StatusName.IN_PROCESSING);
                order.setDateCreate(removeMilliseconds(new Date())); // Set date without milliseconds
                order.setNumberOrder(nextOrderNumber);
                order.setExpress(express);

                orderRepository.save(order);

                cartItem.setOrderCreate(true);
                cartRepository.save(cartItem);
            }
        }
    }


    private Date removeMilliseconds(Date date) {
        long timeWithoutMilliseconds = date.getTime() / 1000 * 1000;
        return new Date(timeWithoutMilliseconds);
    }

    private Long getNextOrderNumber() {
        long currentTimeMillis = System.currentTimeMillis();
        long randomNumber = new Random().nextInt(10000);
        long combinedValue = currentTimeMillis * 10000 + randomNumber;
        long maxOrderNumber = (long) Math.pow(10, 12) - 1;

        if (combinedValue > maxOrderNumber) {
            combinedValue = combinedValue % (maxOrderNumber + 1);
        }

        return combinedValue;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}


