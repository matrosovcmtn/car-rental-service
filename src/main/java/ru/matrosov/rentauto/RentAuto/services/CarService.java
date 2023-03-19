package ru.matrosov.rentauto.RentAuto.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.matrosov.rentauto.RentAuto.models.Car;
import ru.matrosov.rentauto.RentAuto.repositories.CarRepository;
import ru.matrosov.rentauto.RentAuto.util.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findOne(int id) {
        Optional<Car> foundCar = carRepository.findById(id);
        return foundCar.orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public void save(Car car) {
        carRepository.save(car);
    }


}

