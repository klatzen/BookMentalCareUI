import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomService{
    @Output() _Room = [];
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
        this.http.get('http://localhost:2026/api/Room')
        .map(response => response.json())
        .subscribe(data => {data.forEach(Room => this._Room.push(Room))})

        return this._Room;
    }

    saveRoom(tempRoom){
        this.http.post('http://localhost:2026/api/Room',tempRoom).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deleteRoom(id){
        this.http.delete('http://localhost:2026/api/Room/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }
}