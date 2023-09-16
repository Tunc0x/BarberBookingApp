package com.example.SpringProject.controller;

import com.example.SpringProject.clients.Client;
import com.example.SpringProject.clients.LoginRequest;
import com.example.SpringProject.repository.OwnerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.SpringProject.clients.Owner;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
@RequestMapping("/owner")
@CrossOrigin
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    @PostMapping("")
    public void createOwner(@Valid @RequestBody Owner owner)
    {
        ownerRepository.save(owner);
    }

    @PostMapping("/login")
        public boolean isOwnerLoginValid(@RequestBody LoginRequest loginRequest)
        {
            Optional<Owner> optionalOwner = ownerRepository.findOwnerByEmail(loginRequest.getEmail());
            if(optionalOwner.isEmpty())
            {
               return false;
            }


            Owner owner = optionalOwner.get();
            return (owner.getPassword()).equals(loginRequest.getPassword());

        }}

