package ru.matrosov.rentauto.RentAuto.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.matrosov.rentauto.RentAuto.dto.PersonDTO;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.services.CommonService;
import ru.matrosov.rentauto.RentAuto.services.PeopleService;
import ru.matrosov.rentauto.RentAuto.util.EntityErrorResponse;
import ru.matrosov.rentauto.RentAuto.util.EntityNotCreatedException;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;


// @ResponseBody аннотация для возврата не представления а просто строки
@RestController // @Controller + @ResponseBody
@AllArgsConstructor
@RequestMapping("/people")
public class PeopleController {

    private final PeopleService peopleService;
    private final CommonService commonService;

    @GetMapping()
    public List<Person> readAll() {
        return peopleService.findAll();
    }

    @GetMapping("/{id}")
    public Person readOne(@PathVariable("id") int id) {
        return peopleService.findOne(id); // JSON
    }

    @PostMapping                        //@RequestBody - Конвертация из JSON в объект класса PersonDTO
    public ResponseEntity<Person> create(@RequestBody @Valid PersonDTO personDTO, BindingResult bindingResult) {

        commonService.checkBindingResultForErrors(bindingResult);

        return new ResponseEntity<>(peopleService.create(personDTO), HttpStatus.OK);
    }

    @PostMapping ("/register")                       //@RequestBody - Конвертация из JSON в объект класса PersonDTO
    public ResponseEntity<Person> registration(@RequestBody @Valid Person person, BindingResult bindingResult) {
        commonService.checkBindingResultForErrors(bindingResult);
        return new ResponseEntity<>(peopleService.register(person), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Person> update(@RequestBody Person person) {
        return new ResponseEntity<>(peopleService.update(person), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable("id") int id) {
        peopleService.delete(id);
        return HttpStatus.OK;
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
