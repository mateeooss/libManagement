import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private uri = 'http://localhost:8080/user'

  constructor(public http: HttpClient) {}

  getAll(){
    return this.http.get<Person[]>(this.uri);
  }

  save(person: Person) {
    return this.http.post(this.uri, person);
  }

  delete(id: string) {
    return this.http.delete(`${this.uri}/${id}`);
  }
}
