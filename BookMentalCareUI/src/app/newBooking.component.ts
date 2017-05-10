import {Component, Input, Output} from '@angular/core';
import {BookingService} from './services/booking.service';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeListComponent} from './employeeList.component'

@Component({
    selector: 'book',
    template: ` 
            <form>
                <div class="form-group">
                    <label for="booking.Description">Description</label>
                    <input [(ngModel)]="booking.Description" name="description">
                </div>
                <div class="form-group">
                    <label for="booking.StartTime">Start Time</label>
                    <input [(ngModel)]="booking.StartTime" value="{{booking.StartTime}}" name="startTime">
                </div>
                <div class="form-group">
                    <label for="booking.EndTime">End Time</label>
                    <input [(ngModel)]="booking.EndTime" name="endTime">
                </div>
            </form>


            <button (click)="showEmployees()">Show Employee(s)</button> <button (click)="showPatients()">Show Patient</button> <button (click)="showRessources()">Show Ressource(s)</button>

            <br>
            <div *ngIf="booking.Room">
            <p>Booked Room: ID: {{booking.Room.ID}}, Type: {{booking.Room.TYPE}}</p>
            </div>

            <div *ngIf="booking.Patient">
            <p>Patient: {{booking.Patient.FNAME}} {{booking.Patient.LNAME}}, {{booking.Patient.MEDREGNO}} <button (click)="removePatient(booking.Patient)">X</button></p>
            </div>

            <div *ngIf="!(booking.Employees.length == 0)">
            <p>List of employees added to booking</p>
            <ul *ngFor="let emp of booking.Employees">
                <li>Name: {{emp.FNAME}} {{emp.LNAME}}, Initials: {{emp.INITIALS}} <button (click)="removeEmployee(emp)">X</button></li>
            </ul>
            </div>

            <div *ngIf="!(booking.Ressources.length == 0)">
            <p>List of ressources added to booking</p>
            <ul *ngFor="let res of booking.Ressources">
                <li>Name: {{res.Ressource.Name}} <button>X</button></li>
            </ul>
            </div>
            


            <hr>
            <div *ngIf="showEmp">
            <empList [removeEmp]="Employee" [startTime]="booking.StartTime" [endTime]="booking.EndTime"  (sendEmployee)="getEmployee($event)"></empList>
            
            </div>

            <div *ngIf="showPat">
            <patList [startTime]="booking.StartTime" [endTime]="booking.EndTime" (sendPatient)="getPatient($event)"></patList>
            </div>

            <div *ngIf="showRes">
            <resList (sendRessource)="getRessource($event)"></resList>
            </div>
    `
})
export class NewBookingComponent{
    @Input() booking: Booking = {Description: "", Date: "", StartTime: "", EndTime: "", Ressources: [], Patient: null, Employees: [], Room: ""};
    @Output() Employee;
    @Output() Patient;
    showEmp = false;
    showPat = false;
    showRes = false;
    constructor(private bookingService:BookingService, private cookieService : CookieService){

    }
    
     ngOnInit(){
        this.booking.Room = this.cookieService.getObject("room");
        this.booking.StartTime = this.cookieService.get("startTime");
        this.booking.EndTime = this.cookieService.get("endTime");
        this.cookieService.removeAll();
    }
    showEmployees(){
        this.showEmp = !this.showEmp;
    }

    showPatients(){
        this.showPat = !this.showPat;
    }

    showRessources(){
        this.showRes= !this.showRes;
    }
    
    getEmployee(event) {

        this.booking.Employees.push(event);
    }
       
     getPatient(event) {
         if(this.booking.Patient == null){
        this.booking.Patient = event;
         }
    }

    getRessource(event) {
        this.booking.Ressources.push(event);
    }

    removeEmployee(emp){
        this.booking.Employees.splice(this.booking.Employees.indexOf(emp), 1);
        this.Employee = emp;
    }

    removePatient(patient){
        this.booking.Patient = null;
    }
}

interface Booking{
    Description: string;
    Date: string;
    StartTime: string;
    EndTime: string;
    Ressources;
    Patient;
    Employees;
    Room;
}
