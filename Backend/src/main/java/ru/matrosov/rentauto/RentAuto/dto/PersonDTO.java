package ru.matrosov.rentauto.RentAuto.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author Данил Матросов
 * @version 1.0
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    private LocalDate dateOfBirth;

    private CarDTO carDTO;



}
