package ru.matrosov.rentauto.RentAuto.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.matrosov.rentauto.RentAuto.models.Car;
import ru.matrosov.rentauto.RentAuto.services.CarService;
import ru.matrosov.rentauto.RentAuto.util.EntityErrorResponse;
import ru.matrosov.rentauto.RentAuto.util.EntityNotCreatedException;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    public List<Car> getCars() {
        return carService.findAll();
    }
    @GetMapping("/{id}")
    public Car getCar(@PathVariable("id") int id) {
        return carService.findOne(id);
    }

    @PostMapping                        //@RequestBody - Конвертация из JSON в объект класса Car
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid Car car,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();

            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ").append(error.getDefaultMessage())
                        .append(";");
            }

            throw new EntityNotCreatedException(errorMsg.toString());
        }

        carService.save(car);

        // Отправляем Http ответ с пустым телом и со статусом 200
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<EntityErrorResponse> handleException(EntityNotFoundException e) {
        EntityErrorResponse response = new EntityErrorResponse(
                "Car with this id wasn't found!",
                System.currentTimeMillis()
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 = NOT_FOUND
    }

    @ExceptionHandler
    private ResponseEntity<EntityErrorResponse> handleException(EntityNotCreatedException e) {
        EntityErrorResponse response = new EntityErrorResponse(
                e.getMessage(),
                System.currentTimeMillis()
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
