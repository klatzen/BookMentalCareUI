import {Component, Input} from '@angular/core';
import {BookingService} from './services/booking.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'book',
    template: ` 
            <p>{{booking.Room.ID}}</p>
            <form>
                <div class="form-group">
                    <label for="booking.Description">Description</label>
                    <input [(ngModel)]="booking.Description" name="description">
                </div>
                <div class="form-group">
                    <label for="booking.StartTime">Start Time</label>
                    <input [(ngModel)]="booking.StartTime" name="startTime">
                </div>
                <div class="form-group">
                    <label for="booking.EndTime">End Time</label>
                    <input [(ngModel)]="booking.EndTime" name="endTime">
                </div>
            </form>


            <button (click)="showEmployees()">Show Employee(s)</button> <button (click)="showPatients()">Show Patient</button> <button (click)="showRessources()">Show Ressource(s)</button>

            <br>
            <hr>
            <div *ngIf="showEmp">
            <empList (sendEmployee)="getEmployee($event)"></empList>
            
            </div>

            <div *ngIf="showPat">
            <patList (sendPatient)="getPatient($event)"></patList>
            </div>

            <div *ngIf="showRes">
            <resList (sendRessource)="getRessource($event)"></resList>
            </div>
    `
})
export class NewBookingComponent{
    @Input() booking: Booking = {Description: "", Date: "", StartTime: "", EndTime: "", Ressources: [], Patient: "", Employees: [], Room: ""};

    showEmp = false;
    showPat = false;
    showRes = false;

    constructor(private bookingService:BookingService, private cookieService : CookieService){

    }
    
        //[startTime]="booking.StartTime" [endTime]="booking.EndTime" 
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

        this.booking.Patient = event;
    }

    getRessource(event) {
        this.booking.Ressources.push(event);
        console.log(this.booking);
    }

}

interface Booking{
    Description: string;
    Date: string;
    StartTime: string;
    EndTime: string;
    Ressources;
    Patient: string;
    Employees;
    Room;
}
