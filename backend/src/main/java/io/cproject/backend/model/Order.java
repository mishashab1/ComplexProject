package io.cproject.backend.model;

import io.cproject.backend.model.enums.StatusName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.Timestamp;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orderr")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numberOrder", length = 12, nullable = false)
    private Long numberOrder;

    @Column(name = "dateCreate", length = 20, nullable = false)
    private Date dateCreate;

    @Column(name = "dateEnd", length = 20)
    private Date dateEnd;

    @Column(name = "photoBefore", length = 200)
    private String photoBefore;

    @Column(name = "photoAfter", length = 200)
    private String photoAfter;

    @Column(name = "penalty", length = 5)
    private int penalty;

    @Column(name = "express", nullable = false)
    private Boolean express;


    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "status_id", nullable = false)
    private StatusName status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;


    public void setStatus(StatusName status) {
        this.status = status;
    }

    public void setDateCreate(Date dateCreate) {
        this.dateCreate = dateCreate;
    }
}
