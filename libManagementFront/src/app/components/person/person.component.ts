import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { Person } from '../../interfaces/person';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit{
  personList$!: Observable<Person[]>;

  constructor(
    private personsService: PersonsService,
    private dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.refreshPersonList();
  }

  refreshPersonList(): void{
    this.personList$ = this.personsService.getAll(); 
  }

  openPersonDialog(title: string = '', person?: Person): void{
    let dialogRef = this.dialog.open(AddPersonDialogComponent, {
      data: {
        person: person,
        title: "Nova Pessoa"
      }
    })

    this.sentSucess(dialogRef)
  }

  sentSucess(dialogRef: MatDialogRef<any>): void{
    dialogRef.afterClosed().subscribe(res =>{
      if(res) this.refreshPersonList();
    })
  }

  deletePerson(personid: string){
    this.personsService.delete(personid).pipe(
      tap(res => {
        this.refreshPersonList();
      })
    ).subscribe();
  }

  editPerson(person: Person) {
    this.openPersonDialog('Editar Pessoa', person);
  }
}
