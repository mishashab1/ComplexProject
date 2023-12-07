package io.cproject.backend.repository;

import io.cproject.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findAllByUserIdAndOrderCreateIsFalse(Long userId);
}


