import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PersonComponent } from './components/person/person.component';
import { LoanComponent } from './components/loan/loan.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
    {path:"pessoas", component: PersonComponent},
    {path:"emprestimos", component: LoanComponent},
    {path:"livros", component: BookComponent}
];
