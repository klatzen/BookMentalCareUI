import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService{
    @Output() _Bookings = [];
    @Output() Booking;
    @Output() booEvent = new EventEmitter();
    @Output() SortedBookings= [];

    constructor(private http: Http){

    }

    findBooking(id){
        this.http.get('http://localhost:2026/api/Booking/' + id)
        .map(response => response.json())
        .subscribe(data => this.Booking = data,()=> console.log("error"),()=>{
            this.booEvent.emit(this.Booking);  
            console.log(this.Booking);
        })
    }

    findBookings(){
        this.http.get('http://localhost:2026/api/Booking')
        .map(response => response.json())
        .subscribe(data => {data.forEach(booking => this._Bookings.push(booking))})

        return this._Bookings;
    }

    saveBooking(tempBooking){
        this.http.post('http://localhost:2026/api/Booking', tempBooking).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deleteBooking(id){
        this.http.delete('http://localhost:2026/api/Booking/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
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