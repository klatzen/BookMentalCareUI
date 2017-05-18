import {Component} from '@angular/core';
import {RoomService} from './services/room.service';

@Component({
  selector: 'Room',
  template: 
  `
  <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3">
        <label for="_Room.TYPE"> Type</label>
        <input  [(ngModel)]="_Room.TYPE" name="type">
        </div>
        
        <div class="col-xs-3">
        <label for="_Room.ROOMNO">Room No. </label>
        <input  [(ngModel)]="_Room.ROOMNO" name="roomNo">
        </div>
        
        <div class="col-xs-3">
        <label for="_Room.DEPARTMENT.NAME"> Department </label>
        <input [(ngModel)]="_Room.DEPARTMENT.NAME" name="department" placeholder="choose a department from list" readonly>
        </div>
      </div>

        <depList (sendDepartment)="getDepartment($event)"></depList>
        </form>
        <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
          <button (click)="createRoom()" class="btn btn-secondary">Create Room </button>
        </span>
        </div>
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
