package com.mateeooss.libManagement.repository;

import com.mateeooss.libManagement.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(nativeQuery = true, value =
            "SELECT b.* " +
            "FROM book b " +
            "LEFT JOIN loan l ON b.id = l.livro_id AND l.status = false " +
            "WHERE l.livro_id IS NULL;")
    List<Book> findAvailableBooks();
}
