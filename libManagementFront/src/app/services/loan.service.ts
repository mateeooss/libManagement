import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from '../interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private uri = 'http://localhost:8080/loan'
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Loan[]>(this.uri);
  }

  save(loan: Loan) {
    return this.http.post(this.uri, loan);
  }

  delete(id: string) {
    return this.http.delete(`${this.uri}/${id}`);
  }

  conclude(loan: Loan) {
    return this.http.put(`${this.uri}/${loan.id}/conclude`, loan)
  }
}
