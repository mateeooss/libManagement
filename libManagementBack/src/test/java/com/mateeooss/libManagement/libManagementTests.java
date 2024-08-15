package com.mateeooss.libManagement;

import com.mateeooss.libManagement.service.LoanService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class libManagementTests {

	@InjectMocks
	LoanService loanService;

	@Test
	void contextLoads() {
	}


}
