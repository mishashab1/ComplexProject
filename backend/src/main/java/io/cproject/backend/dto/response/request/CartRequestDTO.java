package io.cproject.backend.dto.response.request;

public record CartRequestDTO(
        Long serviceId,
        Long shoesId,
        Long userId,
        String measurements,
        boolean orderCreate
) {
    public Long getUserId() {
        return userId;
    }

    public Long getShoesId() {
        return shoesId;
    }

    public String getMeasurements() {
        return measurements;
    }
}
