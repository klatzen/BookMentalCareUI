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
        <div class="form-group">
        <label for="_Room.DEPARTMENT.NAME"> Department </label>
        <input [(ngModel)]="_Room.DEPARTMENT.NAME" name="department">
        </div>

        <depList (sendDepartment)="getDepartment($event)"></depList>
        </form>
        <button (click)="createRoom()">Create Room </button>
  `

})
export class NewRoomComponent {
  _Room:Room = {TYPE:'',ROOMNO:'',DEPARTMENT:''};
        constructor(private RoomService:RoomService){
            
        }

        createRoom(){
          this.RoomService.saveRoom(this._Room);
        }

        getDepartment(event){
          this._Room.DEPARTMENT =  event;
        }
}
interface Room{
  TYPE,
  ROOMNO,
  DEPARTMENT
}
