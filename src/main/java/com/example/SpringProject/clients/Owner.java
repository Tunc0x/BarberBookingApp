package com.example.SpringProject.clients;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "owner")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "owner_seq_gen")
    @SequenceGenerator(name = "owner_seq_gen", sequenceName = "owner_seq", allocationSize = 1, initialValue = 1)
    private Long id;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email Adress may not be blank")
    private String email;

    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
