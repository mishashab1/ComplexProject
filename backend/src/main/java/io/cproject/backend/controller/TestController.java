package io.cproject.backend.controller;

import io.cproject.backend.dto.response.*;
import io.cproject.backend.dto.response.request.*;
import io.cproject.backend.mapper.OrderDTOMapper;
import io.cproject.backend.mapper.UserDTOMapper;
import io.cproject.backend.model.Order;
import io.cproject.backend.model.TypeShoes;
import io.cproject.backend.model.User;
import io.cproject.backend.repository.UserRepository;
import io.cproject.backend.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    private final UserService userService;
    private final ShoesService shoesService;
    private final CartService cartService;
    private final ServiceService serviceService;
    private final TypeShoesService typeShoesService;
    private final UserDTOMapper userDTOMapper;
    private final UserRepository userRepository;
    private final OrderServices orderServices;
    private final OrderDTOMapper orderDTOMapper;
    private final AuthenticationService authenticationService;

    @PostMapping("/signup") //зарегистрироваться
    public ResponseEntity<Void> signUp(@RequestBody AuthRequest request) {
        User user = authenticationService.signUp(request);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signin") // войти
    public ResponseEntity<AuthResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }


    @PostMapping("/confirm")
    public ResponseEntity<Long> confirm(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String code = payload.get("code");
        Long userId = authenticationService.confirmLogin(email, code);

        if (userId != null) {
            return new ResponseEntity<>(userId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @GetMapping("/getAllShoes")
    public ResponseEntity<List<ShoesResponseDTO>> getAllShoes() {
        List<ShoesResponseDTO> shoesList = shoesService.getAllShoes();
        return ResponseEntity.ok(shoesList);
    }

    @GetMapping("/getAllServices")
    public ResponseEntity<List<ServicesResponseDTO>> getAllServices() {
        List<ServicesResponseDTO> serviceList = serviceService.getAllServices();
        return ResponseEntity.ok(serviceList);
    }

    @PostMapping("/addServiceToCart")
    public ResponseEntity<Void> addToCart(@RequestBody CartRequestDTO request) {
        cartService.addServiceToCart(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/addShoesToCart")
    public ResponseEntity<Void> addShoesToCart(@RequestBody CartRequestDTO request) {
        cartService.addShoesToCart(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    //http://localhost:8080/api/test/getShoesByAttributes?name=Кроссовки&color=Черный&material=Замша
    @GetMapping("/getShoesByAttributes")
    public ResponseEntity<List<ShoesResponseDTO>> getShoesByAttributes(
            @RequestParam("name") String name,
            @RequestParam("color") String color,
            @RequestParam("material") String material
    ) {
        List<ShoesResponseDTO> shoesList = shoesService.getShoesByAttributes(name, color, material);
        return ResponseEntity.ok(shoesList);
    }

    //http://localhost:8080/api/test/getCartByUserId?userId=1
    @GetMapping("/getCartByUserId")
    public ResponseEntity<List<CartResponse>> getCartByUserId(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @GetMapping("/getTotalPriceByUserId")
    public ResponseEntity<Integer> getTotalPriceByUserId(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(cartService.getTotalPriceByUserId(userId));
    }

    @PostMapping("/removeFromCart")
    public ResponseEntity<?> removeFromCartById(@RequestParam("itemId") Long itemId) {
        cartService.removeFromCartById(itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/countCartItems")
    public ResponseEntity<Integer> getItemsCount(
            @RequestParam("userId") Long userId,
            @RequestParam(name = "order_create", defaultValue = "false") boolean orderCreate) {
        int count = cartService.getNumberOfItemsInCart(userId, orderCreate);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/findShoeById")
    public ResponseEntity<ShoesResponseDTO> getShoesById(@RequestParam("id") Long id) {
        ShoesResponseDTO shoes = shoesService.getShoesById(id);
        return ResponseEntity.ok(shoes);
    }

    @GetMapping("/getShoesByTypeTypeId")
    public ResponseEntity<List<ShoesResponseDTO>> getShoesByType(@RequestParam("typeShoesId") Long typeShoesId) {
        List<ShoesResponseDTO> shoesList = shoesService.getShoesByType(typeShoesId);
        return ResponseEntity.ok(shoesList);
    }

    @GetMapping("/getAllTypeShoes")
    public ResponseEntity<List<TypeShoes>> getAllTypeShoes() {
        List<TypeShoes> typeShoesList = typeShoesService.getAllTypeShoes();
        return ResponseEntity.ok(typeShoesList);
    }

    @GetMapping("/getUserDataByUserId")
    public ResponseEntity<UserResponseDTO> getUserDataByUserId(@RequestParam("userId") Long userId) {
        UserResponseDTO userData = userService.getUserDetailsById(userId);
        return ResponseEntity.ok(userData);
    }

    @PutMapping("/updateUserData/{userId}")
    public ResponseEntity<UserResponseDTO> updateUserData(@PathVariable Long userId, @RequestBody UserRequestDTO userRequestDTO) {
        User existingUser = userService.getUserById(userId);
        existingUser.setFirstName(userRequestDTO.firstName());
        existingUser.setPhone(userRequestDTO.phone());
        User updatedUser = userRepository.save(existingUser);
        UserResponseDTO responseDTO = userDTOMapper.apply(updatedUser);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/updateUserPassword/{userId}")
    public ResponseEntity<String> updateUserPassword(
            @PathVariable Long userId,
            @RequestBody Map<String, String> passwordData) {
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        userService.updatePassword(userId, oldPassword, newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }

    @PostMapping("/saveOrder")
    public ResponseEntity<Void> saveOrder(@RequestBody OrderRequestDTO orderRequest) {
        orderServices.saveOrder(orderRequest.getUserId(), orderRequest.getExpress());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getOrdersByUserId")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUserId(@RequestParam("userId") Long userId) {
        List<Order> orders = orderServices.getOrdersByUserId(userId);
        List<OrderResponseDTO> orderResponseDTOs = orders.stream()
                .map(orderDTOMapper::apply)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderResponseDTOs);
    }

}
