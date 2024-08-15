package com.mateeooss.libManagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "data_cadastro", nullable = false)
    private LocalDate cadDate;
    @Column(name = "telefone", nullable = false)
    private String tel;
}
