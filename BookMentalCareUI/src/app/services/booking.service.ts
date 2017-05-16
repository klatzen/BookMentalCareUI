import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertService,AlertMessage} from '../services/alert.service';

@Injectable()
export class BookingService{
    @Output() _Bookings = [];
    @Output() Booking;
    @Output() booEvent = new EventEmitter();
    @Output() SortedBookings= [];

    constructor(private http: Http, private alertService:AlertService){

    }

    findBooking(id){
        this.http.get('http://localhost:2026/api/Booking/' + id)
        .map(response => response.json())
        .subscribe(data => this.Booking = data,()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),()=>{
            this.booEvent.emit(this.Booking);  
            console.log(this.Booking);
        })
    }

    findBookings(){
        this._Bookings = [];
        this.http.get('http://localhost:2026/api/Booking')
        .map(response => response.json())
        .subscribe(data => {data.forEach(booking => this._Bookings.push(booking))},()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"))

        return this._Bookings;
    }
    findEmpBookings(id){
        this.http.get('http://localhost:2026/api/booking/getEmpBooking/'+ 1)
        .map(response => response.json())
        .subscribe(data => {data.forEach(booking => this._Bookings.push(booking))},()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"));
        return this._Bookings;
    }

    saveBooking(tempBooking){
        this.http.post('http://localhost:2026/api/Booking', tempBooking).subscribe(()=>console.log("Done"),()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger")
        ,()=> this.alertService.showAlert(true,"Data blev gemt..","success"));
    }

    deleteBooking(id){
        this.http.delete('http://localhost:2026/api/Booking/'+ id).subscribe(()=>console.log("Done"),()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),
        ()=> this.alertService.showAlert(true,"Data er nu slettet..","success"));
    }

        sortBookings(newStart, newEnd) {
        
        this._Bookings.forEach(booking => {
            if(booking.StartTime >= newStart && booking.EndTime <= newEnd){
                this.SortedBookings.push(booking);
            }
        });
        return this.SortedBookings;
    }
}