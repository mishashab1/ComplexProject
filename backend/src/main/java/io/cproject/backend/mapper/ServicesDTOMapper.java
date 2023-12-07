package io.cproject.backend.mapper;

import io.cproject.backend.dto.response.ServicesResponseDTO;
import io.cproject.backend.model.Services;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ServicesDTOMapper implements Function<Services, ServicesResponseDTO> {
    public ServicesResponseDTO toDto(Services service) {
        return new ServicesResponseDTO(
                service.getId(),
                service.getName(),
                service.getPrice()
        );
    }
    @Override
    public ServicesResponseDTO apply(Services services) {
        if (services == null) {
            return null;
        }
        return new ServicesResponseDTO(
                services.getId(),
                services.getName(),
                services.getPrice()
        );
    }
}
