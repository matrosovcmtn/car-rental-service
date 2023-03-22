package ru.matrosov.rentauto.RentAuto.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "car")
public class Car {

    @Id
    @Column(name = "car_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "model_name")
    private String modelName;
    @Column(name = "horse_powers")
    private int horsePowers;
    @Column(name = "description")
    private String description;
}
