import {Component, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService} from './services/booking.service';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeListComponent} from './employeeList.component'

@Component({
    selector: 'book',
    template: ` 
            <form>
                <div class="form-group">
                    <label for="booking.StartTime">Start Time</label>
                    <input [(ngModel)]="booking.STARTTIME" value="{{booking.STARTTIME}}" name="startTime" readonly>
                </div>
                <div class="form-group">
                    <label for="booking.EndTime">End Time</label>
                    <input [(ngModel)]="booking.ENDTIME" name="endTime" readonly>
                </div>
                <div class="form-group">
                    <label for="booking.Description">Description</label>
                    <textarea [(ngModel)]="booking.DESCRIPTION" name="description"></textarea>
                </div>
            </form>


            
            <button (click)="showEmployees()">Show Employee(s)</button> <button (click)="showPatients()">Show Patient</button> <button (click)="showRessources()">Show Ressource(s)</button>
            <div *ngIf="route == '/booking'">
            <button *ngIf="booking.PATIENT && booking.EMPLOYEES.length > 0" (click)="CompleteBooking()"> Complete Booking</button>
            </div>
            <div *ngIf="route != '/booking'">
                    <button (click)="UpdateBooking()"> Update Booking</button>
                    <button (click)="DeleteBooking()"> Delete Booking</button>
            </div>
            <br>
            <div *ngIf="booking.Room">
            <p>Booked Room: ID: {{booking.Room.ID}}, Type: {{booking.Room.TYPE}}</p>
            </div>

            <div *ngIf="booking.PATIENT">
            <p>Patient: {{booking.PATIENT.FNAME}} {{booking.PATIENT.LNAME}}, {{booking.PATIENT.MEDREGNO}} <button (click)="removePatient(booking.PATIENT)">X</button></p>
            </div>

            <div *ngIf="!(booking.EMPLOYEES.length == 0)">
            <p>List of employees added to booking</p>
            <ul *ngFor="let emp of booking.EMPLOYEES">
                <li>Name: {{emp.FNAME}} {{emp.LNAME}}, Initials: {{emp.INITIALS}} <button (click)="removeEmployee(emp)">X</button></li>
            </ul>
            </div>

            <div *ngIf="!(booking.RESSOURCES.length == 0)">
            <p>List of ressources added to booking</p>
            <ul *ngFor="let res of booking.RESSOURCES">
                <li>Name: {{res.Ressource.Name}} <button (click)="removeRessource(res)">X</button></li>
            </ul>
            </div>
            


            <hr>
            <div *ngIf="showEmp">
            <empList [removeEmp]="Employee" [startTime]="booking.STARTTIME" [endTime]="booking.ENDTIME"  (sendEmployee)="getEmployee($event)"></empList>
            
            </div>

            <div *ngIf="showPat">
            <patList [startTime]="booking.STARTTIME" [endTime]="booking.ENDTIME" (sendPatient)="getPatient($event)"></patList>
            </div>

            <div *ngIf="showRes">
            <resList [removeUnit]="Unit" [startTime]="booking.STARTTIME" [endTime]="booking.ENDTIME" (sendRessource)="getRessource($event)"></resList>
            </div>

        
    `
})
export class NewBookingComponent{
    @Input() booking: Booking = {ID: 0, DESCRIPTION: "", DATE: "", STARTTIME: "", ENDTIME: "", RESSOURCES: [], PATIENT:'', EMPLOYEES: [], Room: ""};
    @Output() Employee;
    @Output() Patient;
    @Output() Unit;
    showEmp = false;
    showPat = false;
    showRes = false;
    route:any;
    constructor(private bookingService:BookingService, private cookieService : CookieService,private activatedRoute:ActivatedRoute){
            
    }
    
     ngOnInit(){
         this.route = window.location.pathname;
         if(this.route != '/booking'){
                 this.activatedRoute.params.map(params => params['id']).subscribe(id => {
                     console.log('test');
                     this.bookingService.findBooking(id);
                     this.bookingService.booEvent.subscribe(data => this.booking = data);
                 })
            }else{
                this.booking.Room = this.cookieService.getObject("room");
                this.booking.STARTTIME = this.cookieService.get("startTime");
                this.booking.ENDTIME = this.cookieService.get("endTime");
                this.cookieService.remove("room");
                this.cookieService.remove("startTime");
                this.cookieService.remove("endTime");
            }
        
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
        this.booking.EMPLOYEES.push(event);
                console.log(this.booking);
    }
       
     getPatient(event) {
         if(this.booking.PATIENT == null){
        this.booking.PATIENT = event;
         }
    }

    getRessource(event) {
        this.booking.RESSOURCES.push(event);
    }

    removeEmployee(emp){
        this.booking.EMPLOYEES.splice(this.booking.EMPLOYEES.indexOf(emp), 1);
        this.Employee = emp;
    }

    removePatient(patient){
        this.booking.PATIENT = null;
    }

    removeRessource(unit){
        this.booking.RESSOURCES.splice(this.booking.RESSOURCES.indexOf(unit), 1);
        this.Unit = unit;
        console.log(this.Unit);
    }
    CompleteBooking(){
        this.bookingService.saveBooking(this.booking);
    }
    UpdateBooking(){
        this.bookingService.saveBooking(this.booking);
    }
    DeleteBooking(){
        this.bookingService.deleteBooking(this.booking.ID);
    }
}

interface Booking{
    ID: number;
    DESCRIPTION: string;
    DATE: string;
    STARTTIME: string;
    ENDTIME: string;
    RESSOURCES;
    PATIENT;
    EMPLOYEES;
    Room;
}
