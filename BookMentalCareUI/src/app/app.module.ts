import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employeeList.component';
import { EmployeeInputComponent } from './employeeInput.component';

import {EmployeeService} from './services/employee.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


import {routing} from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2FilterPipeModule,
    routing
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
