import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomService{
    @Output() _Rooms = [];
    @Output() Room;
    @Output() roomEvent = new EventEmitter();

    constructor(private http: Http){

    }

    findRoom(id){
        this.http.get('http://localhost:2026/api/Room/' + id)
        .map(response => response.json())
        .subscribe(data => this.Room = data,()=> console.log("error"),()=>{
            this.roomEvent.emit(this.Room);  
            console.log(this.Room);
        })
    }

    findRooms(){
        this._Rooms = [];
        this.http.get('http://localhost:2026/api/Room')
        .map(response => response.json())
        .subscribe(data => {data.forEach(Room => this._Rooms.push(Room))})

        return this._Rooms;
    }

    saveRoom(tempRoom){
        this.http.post('http://localhost:2026/api/Room',tempRoom).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deleteRoom(id){
        this.http.delete('http://localhost:2026/api/Room/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }
    findAvailRooms(startTime, endTime){
        this._Rooms = [];
        this.http.get('http://localhost:2026/api/Room/?startTime='+ startTime +"&endTime=" + endTime)
        .map(response => response.json())
        .subscribe(data=> {data.forEach(employee => this._Rooms .push(employee))})

        return this._Rooms ;
    }
}