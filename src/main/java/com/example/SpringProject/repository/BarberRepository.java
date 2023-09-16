package com.example.SpringProject.repository;

import com.example.SpringProject.clients.Barber;
import com.example.SpringProject.clients.Owner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BarberRepository extends CrudRepository<Barber, Long> {




}
