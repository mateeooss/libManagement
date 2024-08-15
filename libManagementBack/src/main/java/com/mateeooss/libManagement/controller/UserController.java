package com.mateeooss.libManagement.controller;

import com.mateeooss.libManagement.model.Person;
import com.mateeooss.libManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Person> save(@RequestBody Person person){
        return ResponseEntity.ok((userService.save(person)));
    }

    @GetMapping()
    public ResponseEntity<List<Person>> getAll(){
        return ResponseEntity.ok((userService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id){
        return this.userService.delete(id);
    }
}
