package ru.matrosov.rentauto.RentAuto.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PersonDTO {
    @NotEmpty(message = "Имя не должно быть пустым")
    @Size(min = 2, max = 100, message = "ФИО должно быть больше 2 и меньше 100 символов")
    private String name;

    @Email
    @NotEmpty(message = "Адрес электронной почты должен быть заполнен")
    private String email;

    @NotEmpty(message = "Номер телефона должен быть заполнен")
    private String tel;

    @Min(value = 0, message = "Возраст должен быть больше чем 0")
    private int age;

}
