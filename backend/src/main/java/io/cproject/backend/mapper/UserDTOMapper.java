package io.cproject.backend.mapper;

import io.cproject.backend.dto.response.UserResponseDTO;
import io.cproject.backend.model.User;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserResponseDTO> {
    @Override
    public UserResponseDTO apply(User user) {
        return new UserResponseDTO(user.getFirstName(), user.getEmail(), user.getPhone());
    }
}
