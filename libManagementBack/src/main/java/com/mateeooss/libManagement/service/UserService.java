package com.mateeooss.libManagement.service;

import com.mateeooss.libManagement.model.Person;
import com.mateeooss.libManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public Person save(Person person) {
        this.assignDate(person);

        return userRepository.save(person);
    }

    public List<Person> getAll() {
        return userRepository.findAllByOrderByCadDateDesc();
    }

    @Transactional
    public ResponseEntity<?> delete(Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private void assignDate(Person person){
        person.setCadDate(LocalDate.now());
    }
}
