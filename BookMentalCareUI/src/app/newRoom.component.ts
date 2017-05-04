import {Component} from '@angular/core';
import {RoomService} from './services/room.service';

@Component({
  selector: 'Room',
  template: 
  `
  <form>
     <div class="form-group">
        <label for="_Room.TYPE"> Type</label>
        <input  [(ngModel)]="_Room.TYPE" name="type">
    </div>
    <div class="form-group">
    <label for="_Room.ROOMNO">Room No. </label>
        <input  [(ngModel)]="_Room.ROOMNO" name="roomNo">
        </div>
        </form>
        <button (click)="createRoom()">Create Room </button>
  `

})
export class NewRoomComponent {
  _Room:Room = {TYPE:'',ROOMNO:''};
        constructor(private RoomService:RoomService){
            
        }

        createRoom(){
          this.RoomService.saveRoom(this._Room);
        }
}
interface Room{
  TYPE,
  ROOMNO
}
