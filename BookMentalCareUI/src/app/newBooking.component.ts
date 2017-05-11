import {Component, Input, Output} from '@angular/core';
import {BookingService} from './services/booking.service';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeListComponent} from './employeeList.component'

@Component({
    selector: 'book',
    template: ` 
            <form>
                <div class="form-group">
                    <label for="booking.StartTime">Start Time</label>
                    <input [(ngModel)]="booking.StartTime" value="{{booking.StartTime}}" name="startTime" readonly>
                </div>
                <div class="form-group">
                    <label for="booking.EndTime">End Time</label>
                    <input [(ngModel)]="booking.EndTime" name="endTime" readonly>
                </div>
                <div class="form-group">
                    <label for="booking.Description">Description</label>
                    <textarea [(ngModel)]="booking.Description" name="description"></textarea>
                </div>
            </form>


            <button (click)="showEmployees()">Show Employee(s)</button> <button (click)="showPatients()">Show Patient</button> <button (click)="showRessources()">Show Ressource(s)</button>
            <button *ngIf="booking.Patient && booking.Employees.length > 0" (click)="CompleteBooking()"> Complete Booking</button>
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
                <li>Name: {{res.Ressource.Name}} <button (click)="removeRessource(res)">X</button></li>
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
            <resList [removeUnit]="Unit" [startTime]="booking.StartTime" [endTime]="booking.EndTime" (sendRessource)="getRessource($event)"></resList>
            </div>

        
    `
})
export class NewBookingComponent{
    @Input() booking: Booking = {Description: "", Date: "", StartTime: "", EndTime: "", Ressources: [], Patient: null, Employees: [], Room: ""};
    @Output() Employee;
    @Output() Patient;
    @Output() Unit;
    showEmp = false;
    showPat = false;
    showRes = false;
    constructor(private bookingService:BookingService, private cookieService : CookieService){

    }
    
     ngOnInit(){
        this.booking.Room = this.cookieService.getObject("room");
        this.booking.StartTime = this.cookieService.get("startTime");
        this.booking.EndTime = this.cookieService.get("endTime");
        //this.cookieService.removeAll();
    }
    showEmployees(){
        this.showEmp = !this.showEmp;
        this.showPat = false;
        this.showRes = false;
    }

    showPatients(){
        this.showPat = !this.showPat;
        this.showEmp = false;
        this.showRes = false;
    }

    showRessources(){
        this.showRes= !this.showRes;
        this.showPat = false;
        this.showEmp = false;
    }
    
    getEmployee(event) {
        this.booking.Employees.push(event);
                console.log(this.booking);
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

    removeRessource(unit){
        this.booking.Ressources.splice(this.booking.Ressources.indexOf(unit), 1);
        this.Unit = unit;
        console.log(this.Unit);
    }
    CompleteBooking(){
        this.bookingService.saveBooking(this.booking);
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
