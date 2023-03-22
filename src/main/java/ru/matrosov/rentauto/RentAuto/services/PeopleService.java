package ru.matrosov.rentauto.RentAuto.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.matrosov.rentauto.RentAuto.dto.PersonDTO;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.repositories.PeopleRepository;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
        return peopleRepository.save(person);
    }

    public List<Person> findAll() {
        return peopleRepository.findAll();
    }

    public Person findOne(int id) {
        Optional<Person> foundPerson = peopleRepository.findById(id);
        return foundPerson.orElseThrow(EntityNotFoundException::new);
    }



    @Transactional
    public void save(Person person) {
        peopleRepository.save(person);
    }


}

