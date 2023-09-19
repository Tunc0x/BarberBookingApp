package com.example.SpringProject;


import com.example.SpringProject.clients.Client;
import com.example.SpringProject.repository.ClientRepository;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ClientControllerTest {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String clientName = "Moritz Jung";

    @BeforeEach
    private void addClientsToDb() {
        Client client = new Client();
        client.setName(clientName);
        client.setPhoneNumber("01793932102");
        client.setAge(19);
        client.setEmail("moritzjunger@gmail.com");
        client.setPassword("password123");

        clientRepository.save(client);

    }

    @AfterEach
    public void clearClientDb() {
        clientRepository.deleteAll();

        String sequenceName = "client_seq";
        jdbcTemplate.execute("ALTER SEQUENCE " + sequenceName + " RESTART WITH 1");
    }

    @Test
    void testGetRequest() {
        TestRestTemplate testRestTemplate = new TestRestTemplate();

        ResponseEntity<Client> clientEntity
                = testRestTemplate.getForEntity("http://localhost:8080/clients/1", Client.class);
        Assertions.assertEquals(HttpStatus.OK, clientEntity.getStatusCode());
        Assertions.assertNotNull(clientEntity.getBody());
        Assertions.assertEquals(clientName, clientEntity.getBody().getName());
    }

    @Test
    void testPostRequest()
    {
        Client secondClient = new Client();
        secondClient.setName("Anna Bauer");
        secondClient.setAge(20);
        secondClient.setPhoneNumber("0178919387");
        secondClient.setEmail("annabauer@email.com");
        secondClient.setPassword("passwordAnna");


        TestRestTemplate testRestTemplate = new TestRestTemplate();
        ResponseEntity<String> response = testRestTemplate.postForEntity("http://localhost:8080/clients", secondClient, String.class);
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode() );

        ResponseEntity<Client> clientEntity
                = testRestTemplate.getForEntity("http://localhost:8080/clients/2", Client.class);

        Assertions.assertNotNull(clientEntity.getBody());
        Assertions.assertEquals("Anna Bauer", clientEntity.getBody().getName());
        Assertions.assertEquals(20, clientEntity.getBody().getAge());
        Assertions.assertEquals("0178919387", clientEntity.getBody().getPhoneNumber());
        Assertions.assertEquals("annabauer@email.com", clientEntity.getBody().getEmail());
        Assertions.assertEquals("passwordAnna", clientEntity.getBody().getPassword());

    }

    @Test
    void testDeleteRequest() {
        TestRestTemplate testRestTemplate = new TestRestTemplate();
        testRestTemplate.delete("http://localhost:8080/clients/1", Client.class);

        ResponseEntity<Client> clientEntity
                = testRestTemplate.getForEntity("http://localhost:8080/clients/1", Client.class);

        Assertions.assertEquals(HttpStatus.NOT_FOUND, clientEntity.getStatusCode());

    }

    @Test
    void testInvalidPostRequest()
    {
        // Invalid Name
        Client secondClient = new Client();
        secondClient.setName("");
        secondClient.setAge(10);
        secondClient.setPhoneNumber("01793932102");
        secondClient.setEmail("hans@gmail.com");


        TestRestTemplate testRestTemplate = new TestRestTemplate();
        ResponseEntity<Client> response = testRestTemplate.postForEntity("http://localhost:8080/clients", secondClient, Client.class);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );

        // Invalid Age
        Client thirdClient = new Client();
        thirdClient.setName("John Cube");
        thirdClient.setAge(3);
        thirdClient.setPhoneNumber("01793932102");
        thirdClient.setEmail("johncube@email.com");


        response = testRestTemplate.postForEntity("http://localhost:8080/clients", thirdClient, Client.class);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );

        // Invalid phone number
        Client fourthClient = new Client();
        fourthClient.setName("Anna Cube");
        fourthClient.setAge(10);
        fourthClient.setPhoneNumber("");
        fourthClient.setEmail("annacube@email.com");


        response = testRestTemplate.postForEntity("http://localhost:8080/clients", fourthClient, Client.class);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );

    }




}


