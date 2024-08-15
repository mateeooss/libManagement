package com.mateeooss.libManagement.repository;

import com.mateeooss.libManagement.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByOrderByCadDateDesc();
}
