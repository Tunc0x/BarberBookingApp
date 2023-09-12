package com.example.SpringProject.controller;

import com.example.SpringProject.clients.Client;
import com.example.SpringProject.error.EntityNotFoundException;
import com.example.SpringProject.error.DuplicateEntryException;
import com.example.SpringProject.repository.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

import java.util.Optional;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {

    private final ClientRepository clientRepository;
    @Autowired // Spring weiß, dass das eine Klasse (Bean) existiert im ApplicationContext und fügt diese automatisch ein.
    // Inversion of Control
    public ClientController(ClientRepository clientRepository)
    {
        this.clientRepository = clientRepository;
    }

    @PostMapping("") // RequestBody -> Informationen im Body werden gelesen und wird in das Java Object Client konvertiert
    public ResponseEntity<String> createClient(@Valid @RequestBody Client client) throws DuplicateEntryException {
        Optional<Client> refClient = clientRepository.findClientByEmail(client.getEmail());

        if(refClient.isPresent())
        {

            throw new DuplicateEntryException("Email already exists.");

        }

        refClient =  clientRepository.findClientByAppointmentDateTime(client.getAppointmentDateTime());
        if(refClient.isPresent())
        {

            throw new DuplicateEntryException("This date is already reserved.");


        }

        else
        {
            clientRepository.save(client);
            return new ResponseEntity<>("The appointment was booked for the client.", HttpStatus.CREATED);
        }


    }

    @GetMapping("/{clientId}")     // Mit PathVariable sagen wir Spring, dass es in unserem Pfad nachschauen soll.
    public Client readClient(@PathVariable Long clientId) throws EntityNotFoundException {
        Optional<Client> client = clientRepository.findById(clientId);
        if(client.isPresent())
        {
            return client.get();
        }
        throw new EntityNotFoundException("Client with this id not found");
    }

    @GetMapping()
    public Iterable<Client> readAllClients()
    {
        return clientRepository.findAll();
    }

    @GetMapping("/appointments/{appointmentDateTime}")     // Mit PathVariable sagen wir Spring, dass es in unserem Pfad nachschauen soll.
    public Client readClient(@PathVariable LocalDateTime clientAppointmentDateTime)
    {
        Optional<Client> client = clientRepository.findClientByAppointmentDateTime(clientAppointmentDateTime);
        if(client.isPresent())
        {
            return client.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No date is set for this time");
    }



    @PutMapping("/{clientId}")
    public void updateClientById(@Valid @RequestBody Client clientUpdate, @PathVariable Long clientId) throws EntityNotFoundException {
        Optional<Client> client = clientRepository.findById(clientId);
        if(!client.isPresent())
        {
            throw new EntityNotFoundException("Client with this id not found");

        }
        Client clientInstance = client.get();
        clientInstance.setName(clientUpdate.getName());
        clientInstance.setAge(clientUpdate.getAge());
        clientInstance.setPhoneNumber(clientUpdate.getPhoneNumber());
        clientInstance.setEmail(clientUpdate.getEmail());
        clientInstance.setAppointmentDateTime(clientUpdate.getAppointmentDateTime());
        clientInstance.setBarber(clientUpdate.getBarber());

        clientRepository.save(clientInstance);


    }

    @DeleteMapping("/{clientId}")
    public void deleteClient( @PathVariable Long clientId) throws EntityNotFoundException {
        Optional<Client> client = clientRepository.findById(clientId);
        if(client.isPresent())
        {
            clientRepository.deleteById(clientId);
            return;
        }
        throw new EntityNotFoundException("Client with this id not found");

    }


}
