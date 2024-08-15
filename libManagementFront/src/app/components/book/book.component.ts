import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Book } from '../../interfaces/book';
import { Observable, tap } from 'rxjs';
import { BookService } from '../../services/book.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { CategoryBook } from '../../enums/category-book.enum';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{
  bookList$!: Observable<Book[]>;
  categoryBook = CategoryBook;
  categoryList = Object.keys(CategoryBook).map(key => ({
    value: key,
    viewValue: CategoryBook[key as keyof typeof CategoryBook]
  }));;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.refreshBookList();
  }

  refreshBookList(): void{
    this.bookList$ = this.bookService.getAll();
  }

  openBookDialog(title: string = '', book?: Book): void{
    let dialogRef = this.dialog.open(AddBookDialogComponent, {
      data: {  
        book: book,
        title: title
      }
    })

    this.sentSucess(dialogRef)
  }

  sentSucess(dialogRef: MatDialogRef<any>): void{
    dialogRef.afterClosed().subscribe(res =>{
      if(res) this.refreshBookList();
    })
  }

  deletePerson(personid: string){
    this.bookService.delete(personid).pipe(
      tap(res => {
        this.refreshBookList();
      })
    ).subscribe();
  }

  editBook(book: Book) {
    this.openBookDialog('Editar Livro', book);
  }

  getCategoryDisplayName(category: CategoryBook): string {
    let categorySelected = this.categoryList.find(res => {
      return res.value == category;
    })?.viewValue;

    return  categorySelected || '';
  }
}
