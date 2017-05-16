import {Component, EventEmitter, Output} from '@angular/core';
import {BookingService} from './services/booking.service';


@Component({
    selector: 'bookList',
    template: `
    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Room No.</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Booking of _Bookings">
            <td>{{Booking.ID}}</td>
            <td>{{Booking.DESCRIPTION}}</td>
            <td>{{Booking.DATE}}</td>
            <td>{{Booking.STARTTIME}}</td>
            <td>{{Booking.ENDTIME}} </td>
            <td>{{Booking.ROOM.ROOMNO}} </td>
            <button [routerLink]="['/booking',Booking.ID]" class="btn btn-secondary">See details</button>
        </tr>
    </tbody>
    </table>
    `
})
export class BookingListComponent{
        _Bookings = [];
        route : any;
        empId: number;

        ngOnInit(){
            this.route = window.location.pathname;
        }      
        constructor(private bookingService : BookingService){
            this._Bookings = bookingService.findEmpBookings(this.empId);
            

        }      
}