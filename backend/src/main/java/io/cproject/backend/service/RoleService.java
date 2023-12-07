package io.cproject.backend.service;

import io.cproject.backend.auth.exception.RoleNotFoundException;
import io.cproject.backend.model.Role;
import io.cproject.backend.model.enums.RoleName;
import io.cproject.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role getRoleByName(RoleName name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));
    }

    public List<SimpleGrantedAuthority> getAuthorities(Long userId) {
        Role role = roleRepository.findByUserId(userId)
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));

        List<SimpleGrantedAuthority> authorities = role.getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getName()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));

        return authorities;
    }
}
