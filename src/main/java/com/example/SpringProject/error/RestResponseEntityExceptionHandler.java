package com.example.SpringProject.error;

import com.example.SpringProject.clients.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@ResponseStatus
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorMessage> clientNotFoundException(EntityNotFoundException exception, WebRequest request)
    {
        ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateEntryException.class)
    public ResponseEntity<ErrorMessage> duplicateEntryException(DuplicateEntryException exception, WebRequest request)
    {
        ErrorMessage message = new ErrorMessage(HttpStatus.CONFLICT, exception.getMessage());

        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }
}
