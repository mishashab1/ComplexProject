package io.cproject.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.cproject.backend.auth.security.JwtAuthenticationService;
import io.cproject.backend.auth.security.UserDetailsImpl;
import io.cproject.backend.dto.response.AuthResponse;
import io.cproject.backend.dto.response.request.AuthRequest;
import io.cproject.backend.dto.response.request.SignInRequest;
import io.cproject.backend.model.Token;
import io.cproject.backend.model.User;
import io.cproject.backend.model.enums.RoleName;
import io.cproject.backend.model.enums.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthenticationService jwtAuthenticationService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final RoleService roleService;
    private final UserService userService;
    @Autowired
    private CodeGeneratorService codeGeneratorService;
    @Autowired
    private EmailService emailService;

    public User signUp(AuthRequest request) {
        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(roleService.getRoleByName(RoleName.CUSTOMER))
                .firstName(request.firstName())
                .phone(request.phone())
                .build();

        return userService.saveUser(user);
    }


    public AuthResponse signIn(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userService.getUserByEmail(request.email());
        List<SimpleGrantedAuthority> authorities = roleService.getAuthorities(user.getId());

        UserDetailsImpl userDetails = new UserDetailsImpl(user.getEmail(), user.getPassword(), authorities);

        String accessToken = jwtAuthenticationService.generateAccessToken(userDetails);
        String refreshToken = jwtAuthenticationService.generateRefreshToken(userDetails);

        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        String code = codeGeneratorService.generateCode(6);
        emailService.sendEmail(user.getEmail(), code);

        // Сохраняем код и дату его генерации в базу данных
        user.setCode(code);
        user.setLoginTime(Instant.now().plus(5, ChronoUnit.MINUTES));
        userService.saveUser(user);

        return new AuthResponse(accessToken, refreshToken);
    }

    public Long confirmLogin(String email, String code) {
        User user = userService.getUserByEmail(email);

        // Проверяем, что код совпадает и время его действия не истекло
        if (user.getCode().equals(code) && Instant.now().isBefore(user.getLoginTime())) {
            user.setCode(null); // Обнуляем код после успешного входа
            userService.saveUser(user);
            return user.getId(); // Возвращаем идентификатор пользователя
        } else {
            return null;
        }
    }




    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) return;

        refreshToken = authHeader.substring(7);
        email = jwtAuthenticationService.extractUsername(refreshToken);

        if (email != null) {
            User user = userService.getUserByEmail(email);

            List<SimpleGrantedAuthority> authorities = roleService.getAuthorities(user.getId());

            UserDetailsImpl userDetails = new UserDetailsImpl(user.getEmail(), user.getPassword(), authorities);

            if (jwtAuthenticationService.isTokenValid(refreshToken, userDetails)) {
                String accessToken = jwtAuthenticationService.generateAccessToken(userDetails);

                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);

                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }


    private void saveUserToken(User user, String accessToken) {
        Token token = Token.builder()
                .user(user)
                .token(accessToken)
                .type(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenService.saveToken(token);
    }


    private void revokeAllUserTokens(User user) {
        List<Token> tokens = tokenService.getAllValidTokens(user.getId());

        if (tokens.isEmpty()) return;

        tokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenService.saveAllTokens(tokens);
    }
}
