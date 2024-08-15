import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private uri = 'http://localhost:8080/book'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]>{
    return this.http.get<Book[]>(this.uri);
  }

  save(book: Book) {
    return this.http.post(this.uri, book);
  }

  delete(id: string) {
    return this.http.delete(`${this.uri}/${id}`);
  }
}
