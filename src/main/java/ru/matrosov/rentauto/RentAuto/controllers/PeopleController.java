package ru.matrosov.rentauto.RentAuto.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.services.PeopleService;
import ru.matrosov.rentauto.RentAuto.util.EntityErrorResponse;
import ru.matrosov.rentauto.RentAuto.util.EntityNotCreatedException;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;


// @ResponseBody аннотация для возврата не представления а просто строки над методом
@RestController // @Controller + @ResponseBody
@RequestMapping("/people")
public class PeopleController {

    private final PeopleService peopleService;

    @Autowired
    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    @GetMapping()
    public List<Person> getPeople() { // Получаем всех людей
        return peopleService.findAll();
    }

    @GetMapping("/{id}") // Получаем одного человека по Id
    public Person getPerson(@PathVariable("id") int id) {
        return peopleService.findOne(id); // Jackson автоматически сконвертирует объект в JSON
    }

    @PostMapping                        //@RequestBody - Конвертация из JSON в объект класса Person
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid Person person,
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

        peopleService.save(person);

        // Отправляем Http ответ с пустым телом и со статусом 200
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<EntityErrorResponse> handleException(EntityNotFoundException e) {
        EntityErrorResponse response = new EntityErrorResponse(
                "Person with this id wasn't found!",
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
