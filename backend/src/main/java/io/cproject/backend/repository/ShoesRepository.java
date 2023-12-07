package io.cproject.backend.repository;

import io.cproject.backend.model.Shoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoesRepository extends JpaRepository<Shoes, Long> {
    @Query("SELECT s FROM Shoes s WHERE s.name = :name AND s.color = :color AND s.material = :material")
    List<Shoes> findShoesByAttributes(@Param("name") String name, @Param("color") String color, @Param("material") String material);
    //
    List<Shoes> findShoesByTypeShoesId(Long typeShoesId);
}

