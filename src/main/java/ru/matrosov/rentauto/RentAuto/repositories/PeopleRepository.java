package ru.matrosov.rentauto.RentAuto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.matrosov.rentauto.RentAuto.models.Person;

@Repository
public interface PeopleRepository extends JpaRepository<Person, Integer> {

}
