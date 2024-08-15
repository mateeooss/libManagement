import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoanService } from '../../services/loan.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Loan } from '../../interfaces/loan';
import { AddLoanDialogComponent } from '../add-loan-dialog/add-loan-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent {
  loanList$!: Observable<Loan[]>;
  constructor(
    private loanService: LoanService,
    private dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.refreshLoanList();
  }

  refreshLoanList(): void{
    this.loanList$ = this.loanService.getAll(); 
  }

  openLoanDialog(title: string = '', loan?: Loan): void{
    let dialogRef = this.dialog.open(AddLoanDialogComponent, {
      data: {
        loan: loan,
        title: "Nova Emprestimo"
      }
    })

    this.sentSucess(dialogRef)
  }

  sentSucess(dialogRef: MatDialogRef<any>): void{
    dialogRef.afterClosed().subscribe(res =>{
      if(res) this.refreshLoanList();
    })
  }

  deleteLoan(loanId: string){
    this.loanService.delete(loanId).pipe(
      tap(res => {
        this.refreshLoanList();
      })
    ).subscribe();
  }

  editLoan(loan: Loan): void {
    this.openLoanDialog('Editar Emprestimo', loan);
  }

  checkLoan(loan: Loan){
    this.loanService.conclude(loan).subscribe(res => {
      this.refreshLoanList();
    });
  }

  getStatusLabel(loan: Loan): string{
    let now = new Date();

    if (loan.status) {
        return "DEVOLVIDO";
    } else if (loan.returnDate < now) {
        return "ATRASADO";
    } else {
        return "EM EMPRESTIMO";
    }
  }
}
