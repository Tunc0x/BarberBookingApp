package com.example.SpringProject.clients;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "barber")
public class Barber {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "barber_seq_gen")
    @SequenceGenerator(name = "barber_seq_gen", sequenceName = "barber_seq", allocationSize = 1, initialValue = 1)
    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
