package com.mateeooss.libManagement.model;

import com.mateeooss.libManagement.enums.CategoryBookEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Book {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "titulo")
    private String title;
    @Column(name = "autor")
    private String autor;
    @Column(name = "isbn", unique = true, nullable = false)
    private String isbn;
    @Column(name = "data_publicacao")
    private LocalDate publiDate;
    @Column(name = "categoria")
    @Enumerated(EnumType.STRING)
    private CategoryBookEnum category;
}
