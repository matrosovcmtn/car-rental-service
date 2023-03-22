package ru.matrosov.rentauto.RentAuto.services;

import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import ru.matrosov.rentauto.RentAuto.util.EntityNotCreatedException;

import java.util.List;

@Service
public class CommonService {
    public void checkBindingResultForErrors(BindingResult bindingResult) {
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
    }
}
