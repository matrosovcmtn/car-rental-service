package ru.matrosov.rentauto.RentAuto.controllers;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.matrosov.rentauto.RentAuto.dto.CarDTO;
import ru.matrosov.rentauto.RentAuto.models.Car;
import ru.matrosov.rentauto.RentAuto.services.CarService;
import ru.matrosov.rentauto.RentAuto.services.PersonService;
import ru.matrosov.rentauto.RentAuto.util.AuthenticatedPersonService;

import java.util.List;

/**
 * @author Данил Матросов
 * @version 1.0
 * Класс контроллера авто с внедренными классами сервисов
 */

@RestController
@AllArgsConstructor
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    private final CarService carService;
    private final ModelMapper modelMapper;
    private final PersonService personService;
    private final AuthenticatedPersonService authenticatedPersonService;

    /**
     * GET - /cars
     * Получение списка автомобилей
     *
     * @return - json вида     {
     * "id": 1,
     * "modelName": "niva rs6",
     * "horsePowers": 800,
     * "description": "Norm tachka",
     * "category": null,
     * "personId": 1
     * }
     * ...
     */

    @GetMapping()
    public List<CarDTO> readAll() {
        return carService.findAll().stream().map(this::convertToCarDTO).toList();
    }

    /**
     * GET - "/cars/{id}"
     * Получение одной машины по id
     *
     * @param id - Уникальный идентификатор авто
     * @return - json вида     {
     * "id": 1,
     * "modelName": "niva rs6",
     * "horsePowers": 800,
     * "description": "Norm tachka",
     * "category": null,
     * "personId": 1
     * }
     */

    @GetMapping("/{id}")
    public Car getCar(@PathVariable("id") int id) {
        return carService.findOne(id);
    }

    /**
     * POST - "/cars"
     * Добавление машины
     *
     * @param carDTO - {
     *     "modelName": "mercedes rs6",
     *     "horsePowers": 87,
     *     "description": "mashina",
     *     "category": "sportcar",
     *     "personId": 4
     * }
     * @return - статус завершения программы (ок - 200)
     */

    @PostMapping
    public void create(@RequestBody CarDTO carDTO) {
        Car car = convertToCar(carDTO);
        car.setPerson(personService.findOne(carDTO.getPersonId()));
        car.getPerson().setCar(car);
        carService.create(car);
    }

    @PutMapping
    public ResponseEntity<Car> update(@RequestBody Car car) {
        return new ResponseEntity<>(carService.update(car), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        carService.delete(id);
    }


    private Car convertToCar(CarDTO carDTO) {
        Car car = modelMapper.map(carDTO, Car.class);
        car.setPerson(personService.findOne(carDTO.getPersonId()));
        return car;
    }

    private CarDTO convertToCarDTO(Car car) {
        CarDTO carDTO = modelMapper.map(car, CarDTO.class);
        carDTO.setPersonId(personService.findPersonsId(car.getPerson().getEmail()));
        return carDTO;
    }

}
