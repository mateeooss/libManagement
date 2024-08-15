import { Book } from "./book";
import { Person } from "./person";

export interface Loan{
    id: string,
    person: Person,
    book: Book,
    loanDate: Date,
    returnDate: Date,
    status: boolean;
}