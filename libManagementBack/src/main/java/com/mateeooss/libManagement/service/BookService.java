package com.mateeooss.libManagement.service;

import com.mateeooss.libManagement.model.Book;
import com.mateeooss.libManagement.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllAvailabe() {
        return bookRepository.findAvailableBooks();
    }

    @Transactional
    public ResponseEntity<?> delete(Long id) {
        try {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("livro deletado com sucesso");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
