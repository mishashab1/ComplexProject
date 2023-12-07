package io.cproject.backend.service;

import io.cproject.backend.dto.response.ShoesResponseDTO;
import io.cproject.backend.mapper.ShoesDTOMapper;
import io.cproject.backend.model.Shoes;
import io.cproject.backend.repository.ShoesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ShoesService {
    private final ShoesRepository shoesRepository;
    private final ShoesDTOMapper shoesDTOMapper;

    public List<ShoesResponseDTO> getAllShoes() {
        List<Shoes> shoesList = shoesRepository.findAll();
        return shoesList.stream()
                .map(shoes -> shoesDTOMapper.toDto(shoes, null)) // передаем null для measurements
                .collect(Collectors.toList());
    }

    public List<ShoesResponseDTO> getShoesByAttributes(String name, String color, String material) {
        List<Shoes> shoesList = shoesRepository.findShoesByAttributes(name, color, material);
        return shoesList.stream()
                .map(shoes -> shoesDTOMapper.toDto(shoes, null)) // передаем null для measurements
                .collect(Collectors.toList());
    }

    public ShoesResponseDTO getShoesById(Long id) {
        Shoes shoes = null;
        try {
            shoes = shoesRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
        return shoesDTOMapper.toDto(shoes, null); // передаем null для measurements
    }

    public List<ShoesResponseDTO> getShoesByType(Long typeShoesId) {
        List<Shoes> shoesList = shoesRepository.findShoesByTypeShoesId(typeShoesId);
        return shoesList.stream()
                .map(shoes -> shoesDTOMapper.toDto(shoes, null))
                .collect(Collectors.toList());
    }

}
