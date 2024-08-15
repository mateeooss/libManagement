package com.mateeooss.libManagement.service;

import com.mateeooss.libManagement.model.Loan;
import com.mateeooss.libManagement.repository.LoanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoanServiceTest {
    @InjectMocks
    LoanService loanService;

    @Mock
    LoanRepository loanRepository;

    Loan loan;

    @BeforeEach
    public void setUp(){
        loan = new Loan();
    }

    @Test
    void buscarLoanComSucesso(){
        when(loanRepository.findAllByOrderByLoanDateDesc()).thenReturn(Arrays.asList(loan));

        List<Loan> loans = loanService.getAll();

        assertNotNull(loans);
        assertEquals(1, loans.size());
        assertEquals(loan, loans.get(0));
        verify(loanRepository).findAllByOrderByLoanDateDesc();
        verifyNoMoreInteractions(loanRepository);
    }
}