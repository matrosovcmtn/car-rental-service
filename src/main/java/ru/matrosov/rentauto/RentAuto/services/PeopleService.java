package ru.matrosov.rentauto.RentAuto.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.matrosov.rentauto.RentAuto.dto.PersonDTO;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.repositories.PeopleRepository;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PeopleService {

    private final PeopleRepository peopleRepository; // Внедряем с помощью конструктора (Lombok)

    public Person create(PersonDTO personDTO) {
        Person person = Person.builder()
                .name(personDTO.getName())
                .email(personDTO.getEmail())
                .tel(personDTO.getTel())
                .age(personDTO.getAge())
                .build();
        person.setRole("ROLE_USER");
        return peopleRepository.save(person);
    }

    public Person register(Person person) {
        person.setRole("ROLE_USER");
        return peopleRepository.save(person);
    }

    public List<Person> findAll() {
        return peopleRepository.findAll();
    }

    public Person findOne(int id) {
        Optional<Person> foundPerson = peopleRepository.findById(id);
        return foundPerson.orElseThrow(EntityNotFoundException::new);
    }

    // так как человек с таким id уже существует он будет не сохраняться а обновляться
    public Person update(Person person) {
        return peopleRepository.save(person);
    }

    public void delete(int id) {
        peopleRepository.deleteById(id);
    }

}

