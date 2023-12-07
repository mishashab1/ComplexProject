package io.cproject.backend.service;

import io.cproject.backend.dto.response.ServicesResponseDTO;
import io.cproject.backend.mapper.ServicesDTOMapper;
import io.cproject.backend.model.Services;
import io.cproject.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;
    private final ServicesDTOMapper serviceDTOMapper;

    public List<ServicesResponseDTO> getAllServices() {
        List<Services> serviceList = serviceRepository.findAll();
        return serviceList.stream()
                .map(serviceDTOMapper::toDto)
                .collect(Collectors.toList());
    }
}