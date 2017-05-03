import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing} from './app.route';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employeeList.component';
import {RessourceComponent} from './ressource.component';
import {RessourceListComponent} from './ressourceList.component';

import {EmployeeService} from './services/employee.service';
import {RessourceService} from './services/ressource.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


import {routing} from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    RessourceComponent,
    RessourceListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
<<<<<<< HEAD
    routing
=======
    routing,
    Ng2FilterPipeModule
    
>>>>>>> origin/master
  ],
  providers: [
    EmployeeService,
    RessourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
