package io.cproject.backend.auth.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtAuthenticationService {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long accessExpiration;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    //Извлекает конкретный claims из JWT, применяя функцию claimResolver.
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }


    //Генерирует токен доступа (Access Token) на основе данных о пользователе (UserDetails).
    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessToken(new HashMap<>(), userDetails);
    }

    //Генерирует токен доступа (Access Token) на основе информации о пользователе (UserDetails) и дополнительных
    public String generateAccessToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, accessExpiration);
    }


    //Генерирует токен обновления (Refresh Token) на основе информации о пользователе (UserDetails).
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    // Внутренний метод для построения токена на основе информации о пользователе и параметров токена.
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    //Проверяет, действителен ли переданный токен для указанных пользовательских данных.
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }


    //Проверяет, истек ли срок действия переданного токена (Token).
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    //Извлекает дату истечения срока действия токена из переданного токена.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    //Извлекает все данные (Claims) из переданного токена.
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    //Получает ключ для подписи токенов на основе секретного ключа.
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
