import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employeeList.component';
import {RessourceComponent} from './ressource.component';
import {RessourceListComponent} from './ressourceList.component';
import {NewRessourceComponent} from './newRessource.component';
import {NewEmployeeComponent} from './newEmployee.component';
import {PatientListComponent} from './patientList.component';
import {PatientComponent} from './patient.component';
import {NewPatientComponent} from './newPatient.component';
import {DepartmentListComponent} from './departmentList.component';
import {DepartmentComponent} from './department.component';
import {NewDepartmentComponent} from './newDepartment.component';


import {EmployeeService} from './services/employee.service';
import {RessourceService} from './services/ressource.service';
import {PatientService} from './services/patient.service';
import {DepartmentService} from './services/department.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


import {routing} from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    RessourceComponent,
    RessourceListComponent,
    NewRessourceComponent,
    NewEmployeeComponent,
    PatientListComponent,
    PatientComponent,
    NewPatientComponent,
    DepartmentListComponent,
    DepartmentComponent,
    NewDepartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2FilterPipeModule
  ],
  providers: [
    EmployeeService,
    RessourceService,
    PatientService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
