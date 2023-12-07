package io.cproject.backend.dto.response.request;

public record OrderRequestDTO(
        Long cartId,
        Long userId,
        Boolean express
) {
    public Long getUserId() {
        return userId;
    }

    public boolean getExpress() {
        return express;
    }
}
