import {Component, EventEmitter, Output} from '@angular/core';
import {BookingService} from './services/booking.service';


@Component({
    selector: 'bookList',
    template: `
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Description</td>
            <td>Date</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Room No.</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Booking of _Bookings">
            <a [routerLink]="[Booking.ID]">
            <td>{{Booking.ID}}</td>
            <td>{{Booking.DESCRIPTION}}</td>
            <td>{{Booking.DATE}}</td>
            <td>{{Booking.STARTTIME}}</td>
            <td>{{Booking.ENDTIME}} </td>
            <td>{{Booking.ROOM.ROOMNO}} </td></a>
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