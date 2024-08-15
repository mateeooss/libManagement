package com.mateeooss.libManagement.controller;

import com.mateeooss.libManagement.model.Book;
import com.mateeooss.libManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "book")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping()
    public ResponseEntity<Book> save(@RequestBody Book book){
        return ResponseEntity.ok((bookService.save(book)));
    }

    @GetMapping()
    public ResponseEntity<List<Book>> getAll(){
        return ResponseEntity.ok((bookService.getAllAvailabe()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id){
        return this.bookService.delete(id);
    }
}
