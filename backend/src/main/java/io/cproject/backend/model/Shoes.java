package io.cproject.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shoes")
public class Shoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 200, nullable = false)
    private String name;

    @Column(name = "color", length = 200, nullable = false)
    private String color;

    @Column(name = "price", length = 20, nullable = false)
    private Integer price;

    @Column(name = "material", length = 200, nullable = false)
    private String material;

    @Column(name = "photo", length = 200, nullable = false)
    private String photo;


    @ManyToOne
    @JoinColumn(name = "typeShoes_id", nullable = false)
    private TypeShoes typeShoes;

    @OneToMany(mappedBy = "shoes")
    private List<Cart> carts;


}
