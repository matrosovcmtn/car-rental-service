package ru.matrosov.rentauto.RentAuto.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.matrosov.rentauto.RentAuto.models.Person;
import ru.matrosov.rentauto.RentAuto.repositories.PeopleRepository;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PeopleService {

    private final PeopleRepository peopleRepository;

    public PeopleService(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
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

