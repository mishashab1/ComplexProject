package io.cproject.backend.service;
import io.cproject.backend.model.TypeShoes;
import io.cproject.backend.repository.TypeShoesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeShoesService {
    private final TypeShoesRepository typeShoesRepository;

    public TypeShoesService(TypeShoesRepository typeShoesRepository) {
        this.typeShoesRepository = typeShoesRepository;
    }

    public List<TypeShoes> getAllTypeShoes() {
        return typeShoesRepository.findAll();
    }
}
