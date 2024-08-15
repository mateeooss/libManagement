import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./components/menu/menu.component";
import { PersonComponent } from "./components/person/person.component";

@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      MatSidenavModule,
    ],
    providers: [
        provideHttpClient()
    ],
    bootstrap: []
  })
  export class AppModule { }