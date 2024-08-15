package com.mateeooss.libManagement.controller;

import com.mateeooss.libManagement.model.Book;
import com.mateeooss.libManagement.model.Loan;
import com.mateeooss.libManagement.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("loan")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService){
        this.loanService = loanService;
    }

    @PostMapping()
    public ResponseEntity<Loan> save(@RequestBody Loan loan){
        return ResponseEntity.ok((loanService.save(loan)));
    }

    @GetMapping()
    public ResponseEntity<List<Loan>> getAll(){
        return ResponseEntity.ok((loanService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id){
        return this.loanService.delete(id);
    }

    @PutMapping("/{id}/conclude")
    public ResponseEntity<?> conclude(@PathVariable(name = "id") Long id){
        return this.loanService.conclude(id);
    }
}
