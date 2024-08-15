package com.mateeooss.libManagement.service;

import com.mateeooss.libManagement.model.Loan;
import com.mateeooss.libManagement.model.Person;
import com.mateeooss.libManagement.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository){
        this.loanRepository = loanRepository;
    }

    @Transactional
    public Loan save(Loan loan) {
        loan.setStatus(false);
        this.setLoanDates(loan);
        return this.loanRepository.save(loan);
    }

    public List<Loan> getAll() {
        return loanRepository.findAllByOrderByLoanDateDesc();
    }

    @Transactional
    public ResponseEntity<?> delete(Long id) {
        try {
            loanRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    public ResponseEntity<?> conclude(Long id) {
        loanRepository.findById(id).ifPresent(loan -> {
            loan.setStatus(true);
            loanRepository.save(loan);
        });

        return ResponseEntity.ok().build();
    }

    private void setLoanDates(Loan loan) {
        loan.setLoanDate(LocalDate.now());
    }
}
