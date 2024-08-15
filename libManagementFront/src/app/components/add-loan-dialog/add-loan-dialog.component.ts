import { Component, Inject } from '@angular/core';
import { Loan } from '../../interfaces/loan';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { Person } from '../../interfaces/person';
import { Book } from '../../interfaces/book';
import { PersonsService } from '../../services/persons.service';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-loan-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './add-loan-dialog.component.html',
  styleUrl: './add-loan-dialog.component.scss'
})
export class AddLoanDialogComponent {
  title!: string;
  loan!: Loan;
  edit!: boolean;
  personList$!: Observable<Person[]>;
  bookList$!: Observable<Book[]>;

  form: FormGroup = new FormGroup({
    person: new FormControl(null, [Validators.required]),
    book: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    returnDate: new FormControl(null, [Validators.required]),
  });

  returnDateFilter = (d: Date | null): boolean => {
    const date = (d || new Date());
    return date >= new Date();
  };

  constructor(
    private loanService: LoanService,
    private personService: PersonsService,
    private bookService: BookService,
    private dialog: MatDialogRef<AddLoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {loan: Loan, title: string}
  ){

  }

  ngOnInit(): void {
    this.itsAnEdit();
    this.initValues();
    this.initPersons();
    this.initBooks();
  }

  initBooks() {
    this.personList$ = this.personService.getAll();
  }

  initPersons() {
    this.bookList$ = this.bookService.getAll();
  }

  itsAnEdit(){
    if(this.data?.loan){
      this.edit = true;
      this.loan = this.data.loan;

      this.form.patchValue({
        person: this.loan.person,
        book: this.loan.book,
        returnDate: this.loan.returnDate
      })
    }
  }

  initValues(){
    this.title = this.data.title;
  }

  createLoan() {
    this.form.markAllAsTouched();

    if(this.form.valid){
      let loan: Loan = this.form.value;
      if(this.edit) loan.id = this.loan.id;
      
      this.loanService.save(loan).pipe(
        tap(res => {
          this.dialog.close(true);
        })
      ).subscribe()
    }
  }
}
