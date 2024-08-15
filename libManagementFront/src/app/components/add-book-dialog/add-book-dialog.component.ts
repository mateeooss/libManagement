import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CategoryBook } from '../../enums/category-book.enum';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.scss'
})
export class AddBookDialogComponent implements OnInit{
  title!: string;
  book!: Book;
  edit!: boolean;
  categoryList = Object.keys(CategoryBook).map(key => ({
    value: key,
    viewValue: CategoryBook[key as keyof typeof CategoryBook]
  }));

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    autor: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isbn: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    publiDate: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required])
  });

  constructor(
    private bookService: BookService,
    private dialog: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {book: Book, title: string}
  ){

  }

  ngOnInit(): void {
    this.itsAnEdit();
    this.initValues();
  }

  itsAnEdit(){
    if(this.data?.book){
      this.edit = true;
      this.book = this.data.book;

      this.form.patchValue({
        title: this.book.title,
        autor: this.book.autor,
        isbn: this.book.isbn,
        publiDate: this.book.publiDate,
        category: this.book.category
      })
    }
  }

  initValues(){
    this.title = this.data.title;
  }

  createPerson() {
    this.form.markAllAsTouched();

    if(this.form.valid){
      let book: Book = this.form.value;
      if(this.edit) book.id = this.book.id;
      
      this.bookService.save(book).pipe(
        tap(res => {
          this.dialog.close(true);
        })
      ).subscribe()
    }
  }
}
