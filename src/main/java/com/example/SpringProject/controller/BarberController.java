package com.example.SpringProject.controller;

import com.example.SpringProject.clients.Barber;
import com.example.SpringProject.clients.LoginRequest;
import com.example.SpringProject.clients.Owner;
import com.example.SpringProject.repository.BarberRepository;
import com.example.SpringProject.repository.OwnerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/barber")
@CrossOrigin
public class BarberController {

    @Autowired
    private BarberRepository barberRepository;

    @PostMapping("")
    public void createBarber(@Valid @RequestBody Barber barber)
    {
        barberRepository.save(barber);
    }

  }
