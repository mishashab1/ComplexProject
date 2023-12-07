package io.cproject.backend.service;

import io.cproject.backend.auth.exception.UserNotFoundException;
import io.cproject.backend.dto.response.UserResponseDTO;
import io.cproject.backend.mapper.UserDTOMapper;
import io.cproject.backend.model.User;
import io.cproject.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }


    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponseDTO getUserDetailsById(Long userId) {
        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userDTOMapper.apply(user);
    }

    public void updatePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            String encodedNewPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encodedNewPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Old password does not match");
        }
    }

}
