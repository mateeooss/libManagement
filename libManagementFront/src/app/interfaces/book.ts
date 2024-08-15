import { CategoryBook } from "../enums/category-book.enum";

export interface Book{
    id: string,
    title: string,
    autor: string,
    isbn: string,
    publiDate: Date,
    category: CategoryBook;
}