package com.example.SpringProject.repository;

import com.example.SpringProject.clients.Appointment;
import com.example.SpringProject.clients.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    // SELECT * from client WHERE email = ?

    //  @Query("SELECT c FROM Client c WHERE c.email = ?")


    Optional<Appointment> findAppointmentByDateTime(LocalDateTime dateTime);






}
