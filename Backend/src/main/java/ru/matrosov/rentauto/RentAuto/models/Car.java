package ru.matrosov.rentauto.RentAuto.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * @author Данил Матросов
 * @version 1.0
 */

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

    private String description;

    private String category;

    private int price;

    @JsonIgnore
    @OneToOne(mappedBy = "car")
    private Person person;



}
