import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PersonsService } from '../../services/persons.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { tap } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-add-person-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './add-person-dialog.component.html',
  styleUrl: './add-person-dialog.component.scss'
})
export class AddPersonDialogComponent implements  OnInit{
  title!: string;
  person!: Person;
  edit!: boolean;

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    tel: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private personService: PersonsService,
    private dialog: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {person: Person, title: string}
  ){

  }

  ngOnInit(): void {
    this.itsAnEdit();
    this.initValues();
  }

  itsAnEdit(){
    if(this.data?.person){
      this.edit = true;
      this.person = this.data.person;

      this.form.patchValue({
        nome: this.person.nome,
        email: this.person.email,
        tel: this.person.tel
      })
    }
  }

  initValues(){
    this.title = this.data.title;
  }

  createPerson() {
    this.form.markAllAsTouched();

    if(this.form.valid){
      let person: Person = this.form.value;
      if(this.edit) person.id = this.person.id;
      
      this.personService.save(person).pipe(
        tap(res => {
          this.dialog.close(true);
        })
      ).subscribe()
    }
  }
}
