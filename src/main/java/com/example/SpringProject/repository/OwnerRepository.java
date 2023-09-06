package com.example.SpringProject.repository;

import com.example.SpringProject.clients.Client;
import com.example.SpringProject.clients.Owner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends CrudRepository<Owner, Long> {

    Optional<Owner> findOwnerByEmail(String email);




}
