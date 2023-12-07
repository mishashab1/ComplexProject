package io.cproject.backend.repository;

import io.cproject.backend.model.Role;
import io.cproject.backend.model.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);

    @Query(value = """
        select r from Role r join fetch r.users u\s
        where u.id = :id
    """)
    Optional<Role> findByUserId(Long id);
}