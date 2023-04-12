package ru.matrosov.rentauto.RentAuto.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.matrosov.rentauto.RentAuto.models.Car;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.services.CarService;
import ru.matrosov.rentauto.RentAuto.services.CommonService;
import ru.matrosov.rentauto.RentAuto.util.EntityErrorResponse;
import ru.matrosov.rentauto.RentAuto.util.EntityNotCreatedException;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;

/**
 * @author Данил Матросов
 * @version 1.0
 * Класс контроллера авто с внедренными
*/

@RestController
@AllArgsConstructor // Lombok для упрощения внедрения сервисов
@RequestMapping("/cars")
@CrossOrigin(origins="http://localhost:3000")
public class CarController {

    private final CarService carService;
    private final CommonService commonService;

    @GetMapping()
    public List<Car> readAll() {
        return carService.findAll();
    }
    @GetMapping("/{id}")
    public Car getCar(@PathVariable("id") int id) {
        return carService.findOne(id);
    }

    @PostMapping                        //@RequestBody - Конвертация из JSON в объект класса Car
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid Car car, BindingResult bindingResult) {

        commonService.checkBindingResultForErrors(bindingResult);
        carService.create(car);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Car> update(@RequestBody Car car) {
        return new ResponseEntity<>(carService.update(car), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable("id") int id) {
        carService.delete(id);
        return HttpStatus.OK;
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
