package ru.matrosov.rentauto.RentAuto.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter // Аннотации для автоматической генерации сеттеров и геттеров
@NoArgsConstructor // автогенерация конструктора (без арг-ов)
@Entity
@Table(name = "car")
public class Car {
    @Id
    @Column(name = "car_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "model_name")
    private String modelName;
    @Column(name = "license_plate")
    private String licensePlate;
}
