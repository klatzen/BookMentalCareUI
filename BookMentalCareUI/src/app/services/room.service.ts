import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertService} from './alert.service';

@Injectable()
export class RoomService{
    @Output() _Rooms = [];
    @Output() Room;
    @Output() roomEvent = new EventEmitter();

    constructor(private http: Http, private alertService:AlertService){

    }

    findRoom(id){
        this.http.get('http://localhost:2026/api/Room/' + id)
        .map(response => response.json())
        .subscribe(data => this.Room = data, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"),()=>{
            this.roomEvent.emit(this.Room);  
        })
    }

    findRooms(){
        this._Rooms = [];
        this.http.get('http://localhost:2026/api/Room')
        .map(response => response.json())
        .subscribe(data => {data.forEach(Room => this._Rooms.push(Room))}, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))

        return this._Rooms;
    }

    saveRoom(tempRoom){
        this.http.post('http://localhost:2026/api/Room',tempRoom).subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev gemt..", "success"));
    }

    deleteRoom(id){
        this.http.delete('http://localhost:2026/api/Room/'+ id).subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev gemt..", "success"));
    }
    findAvailRooms(startTime, endTime){
        this._Rooms = [];
        this.http.get('http://localhost:2026/api/Room/?startTime='+ startTime +"&endTime=" + endTime)
        .map(response => response.json())
        .subscribe(data=> {data.forEach(employee => this._Rooms .push(employee))}, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))

        return this._Rooms ;
    }
}