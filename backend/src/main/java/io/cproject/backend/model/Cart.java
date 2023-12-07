package io.cproject.backend.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderCreate", nullable = false)
    private Boolean orderCreate;

    @Column(name = "measurements", length = 20)
    private String measurements;

    @Column(name = "cell")
    private Integer cell;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @Nullable
    private Services service;

    @ManyToOne
    @JoinColumn(name = "shoes_id")
    @Nullable
    private Shoes shoes;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
