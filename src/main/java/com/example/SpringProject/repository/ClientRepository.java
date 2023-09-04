package com.example.SpringProject.repository;

import com.example.SpringProject.clients.Client;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.expression.spel.support.ReflectivePropertyAccessor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {

    // SELECT * from client WHERE email = ?

  //  @Query("SELECT c FROM Client c WHERE c.email = ?")
    Optional<Client> findClientByEmail(String email);


}
