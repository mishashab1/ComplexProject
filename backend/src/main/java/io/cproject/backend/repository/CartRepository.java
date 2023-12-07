package io.cproject.backend.repository;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import io.cproject.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Nullable
    Cart findCartById(Long id);

    int countByUserIdAndOrderCreate(Long userId, boolean orderCreate);

    List<Cart> findByUserId(Long userId);
}
