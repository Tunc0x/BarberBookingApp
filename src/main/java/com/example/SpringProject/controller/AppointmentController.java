package com.example.SpringProject.controller;

import com.example.SpringProject.clients.Appointment;
import com.example.SpringProject.clients.Client;
import com.example.SpringProject.error.DuplicateEntryException;
import com.example.SpringProject.error.EntityNotFoundException;
import com.example.SpringProject.repository.AppointmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    @Autowired
    // Spring weiß, dass das eine Klasse (Bean) existiert im ApplicationContext und fügt diese automatisch ein.
    // Inversion of Control
    public AppointmentController(AppointmentRepository appointmentRepository)
    {
        this.appointmentRepository = appointmentRepository;
    }

    @PostMapping("") // RequestBody -> Informationen im Body werden gelesen und wird in das Java Object Appointment konvertiert
    public ResponseEntity<String> createAppointment(@Valid @RequestBody Appointment appointment) throws DuplicateEntryException {


        Optional<Appointment>  refAppointment =  appointmentRepository.findAppointmentByDateTime(appointment.getDateTime());
        if(refAppointment.isPresent())
        {

            throw new DuplicateEntryException("This date is already reserved.");


        }

        else
        {
            appointmentRepository.save(appointment);
            return new ResponseEntity<>("The appointment was booked.", HttpStatus.CREATED);
        }


    }

    @GetMapping("/{appointmentId}")     // Mit PathVariable sagen wir Spring, dass es in unserem Pfad nachschauen soll.
    public Appointment readAppointment(@PathVariable Long appointmentId) throws EntityNotFoundException {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if(appointment.isPresent())
        {
            return appointment.get();
        }
        throw new EntityNotFoundException("Appointment with this id not found");
    }

    @GetMapping()
    public Iterable<Appointment> readAllAppointments()
    {
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointments/{appointmentDateTime}")     // Mit PathVariable sagen wir Spring, dass es in unserem Pfad nachschauen soll.
    public Appointment readAppointment(@PathVariable LocalDateTime appointmentDateTime)
    {
        Optional<Appointment> appointment = appointmentRepository.findAppointmentByDateTime(appointmentDateTime);
        if(appointment.isPresent())
        {
            return appointment.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No appointment is set for this time");
    }

    @GetMapping("/client/{appointmentId}")
    public Client readClientByAppointmentId(@PathVariable Long appointmentId) throws EntityNotFoundException {
      Appointment  appointment = readAppointment(appointmentId);
      Client client = appointment.getClient();

      return client;
    }



    @PutMapping("/{appointmentId}")
    public void updateAppointmentById(@Valid @RequestBody Appointment appointmentUpdate, @PathVariable Long appointmentId) throws EntityNotFoundException {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if(appointment.isEmpty())
        {
            throw new EntityNotFoundException("Appointment with this id not found");

        }
        Appointment appointmentInstance = appointment.get();
        appointmentInstance.setDateTime(appointmentUpdate.getDateTime());
        appointmentInstance.setBarber(appointmentUpdate.getBarber());

        appointmentRepository.save(appointmentInstance);


    }

    @DeleteMapping("/{appointmentId}")
    public void deleteAppointment( @PathVariable Long appointmentId) throws EntityNotFoundException {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if(appointment.isPresent())
        {
            appointmentRepository.deleteById(appointmentId);
            return;
        }
        throw new EntityNotFoundException("Appointment with this id not found");

    }




}