package com.mateeooss.libManagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Person person;
    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Book book;
    @Column(name = "data_emprestimo")
    private LocalDate loanDate;
    @Column(name = "data_devolucao")
    private LocalDate returnDate;
    @Column(name = "status")
    private Boolean status;
}
