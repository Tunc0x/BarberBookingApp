package com.example.SpringProject.controller;

import com.example.SpringProject.clients.Client;
import com.example.SpringProject.repository.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {
    @Autowired // Spring weiß, dass das eine Klasse (Bean) existiert im ApplicationContext und fügt diese automatisch ein.
               // Inversion of Control
    ClientRepository clientRepository;

    @PostMapping("") // RequestBody -> Informationen im Body werden gelesen und wird in das Java Object Client konvertiert
    public void createClient(@Valid @RequestBody Client client)
    {
        Optional<Client> refClient = clientRepository.findClientByEmail(client.getEmail());

        if(refClient.isPresent())
        {
            throw new IllegalArgumentException("Email already taken");

        }

        else
        {
            clientRepository.save(client);
        }


    }

    @GetMapping("/{clientId}")     // Mit PathVariable sagen wir Spring, dass es in unserem Pfad nachschauen soll.
    public Client readClient(@PathVariable Long clientId)
    {
        Optional<Client> client = clientRepository.findById(clientId);
        if(client.isPresent())
        {
            return client.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Client with this id not found");
    }

    @GetMapping("/getAll")
    public Iterable<Client> readAllClients()
    {
        return clientRepository.findAll();
    }



    @PutMapping("/{clientId}")
    public void updateClientById(@Valid @RequestBody Client clientUpdate, @PathVariable Long clientId)
    {
        Optional<Client> client = clientRepository.findById(clientId);
        if(!client.isPresent())
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Client with this id not found");

        }
        Client clientInstance = client.get();
        clientInstance.setName(clientUpdate.getName());
        clientInstance.setAge(clientUpdate.getAge());
        clientInstance.setPhoneNumber(clientUpdate.getPhoneNumber());
        clientInstance.setEmail(clientUpdate.getEmail());
        clientInstance.setAppointmentDateTime(clientUpdate.getAppointmentDateTime());

        clientRepository.save(clientInstance);


    }

    @DeleteMapping("/{clientId}")
    public void deleteClient( @PathVariable Long clientId){
        Optional<Client> client = clientRepository.findById(clientId);
        if(client.isPresent())
        {
            clientRepository.deleteById(clientId);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Client with this id not found");

    }



    private boolean isPhoneNumberValid(String phoneNumber)
    {
        return phoneNumber.length() <= 13;


    }



}
