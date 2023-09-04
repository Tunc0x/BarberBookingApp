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

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class SpringProjectApplicationTests {
	@Autowired
	private ClientRepository clientRepository;

	@Autowired JdbcTemplate jdbcTemplate;

	private static final String clientName = "Moritz Jung";

	@BeforeEach
	private void addClientsToDb()
	{
		Client client = new Client();
		client.setName(clientName);
		client.setPhoneNumber("01793932102");
		client.setAge(19);

		clientRepository.save(client);

	}

	@AfterEach
	public void clearClientDb()
	{
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
		Assertions.assertEquals(clientName,clientEntity.getBody().getName());
	}

	@Test
	void testPostRequest()
	{
		Client secondClient = new Client();
		secondClient.setName("Anna Bauer");
		secondClient.setAge(20);
		secondClient.setPhoneNumber("0178919387");
		secondClient.setEmail("annabauer@email.com");

		TestRestTemplate testRestTemplate = new TestRestTemplate();
		ResponseEntity<Client> response = testRestTemplate.postForEntity("http://localhost:8080/clients", secondClient, Client.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode() );

		ResponseEntity<Client> clientEntity
				= testRestTemplate.getForEntity("http://localhost:8080/clients/2", Client.class);

		Assertions.assertNotNull(clientEntity.getBody());
		Assertions.assertEquals("Anna Bauer", clientEntity.getBody().getName());
		Assertions.assertEquals(20, clientEntity.getBody().getAge());
		Assertions.assertEquals("0178919387", clientEntity.getBody().getPhoneNumber());



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
		Client secondClient = new Client();
		secondClient.setName("");
		secondClient.setAge(10);
		secondClient.setPhoneNumber("01793932102");

		TestRestTemplate testRestTemplate = new TestRestTemplate();
		ResponseEntity<Client> response = testRestTemplate.postForEntity("http://localhost:8080/clients", secondClient, Client.class);
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );

		Client thirdClient = new Client();
		thirdClient.setName("John Cube");
		thirdClient.setAge(3);
		thirdClient.setPhoneNumber("01793932102");

		response = testRestTemplate.postForEntity("http://localhost:8080/clients", thirdClient, Client.class);
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );


		Client fourthClient = new Client();
		fourthClient.setName("John Cube");
		fourthClient.setAge(10);
		fourthClient.setPhoneNumber("");

		response = testRestTemplate.postForEntity("http://localhost:8080/clients", fourthClient, Client.class);
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode() );



	}



}
