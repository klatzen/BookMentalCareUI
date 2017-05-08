import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Headers } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employeeList.component';
import {RessourceComponent} from './ressource.component';
import {RessourceListComponent} from './ressourceList.component';
import {NewRessourceComponent} from './newRessource.component';
import {NewEmployeeComponent} from './newEmployee.component';
import {PatientListComponent} from './patientList.component';
import {PatientComponent} from './patient.component';
import {UnitListComponent} from './unitList.component';
import {RoomListComponent} from './roomList.component';
import {RoomComponent} from './room.component';
import {NewRoomComponent} from './newRoom.component';
import {NewBookingComponent} from './newBooking.component';

import {EditUnitComponent} from './editUnit.component';

import {SignInComponent} from './signIn.component';

import {EmployeeService} from './services/employee.service';
import {RessourceService} from './services/ressource.service';
import {PatientService} from './services/patient.service';
import {RoomService} from './services/room.service';
import {BookingService} from './services/booking.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { CookieService } from 'angular2-cookie/services/cookies.service';


import {routing} from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    RessourceComponent,
    RessourceListComponent,
    UnitListComponent,
    NewRessourceComponent,
    NewEmployeeComponent,
    PatientListComponent,
    PatientComponent,
    RoomListComponent,
    RoomComponent,
    NewRoomComponent,
    EditUnitComponent,
    SignInComponent,
    NewBookingComponent
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
    RoomService,
    CookieService,
    BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
