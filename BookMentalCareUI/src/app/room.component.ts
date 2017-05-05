import {Component, Input} from '@angular/core';
import {RoomService} from './services/room.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'pat',
    template: ` 
     <div *ngIf="_Room != null">
     <form>
     <div class="form-group">
        <label for="_Room.TYPE"> Type</label>
        <input value="{{_Room.TYPE}}" [(ngModel)]="_Room.TYPE" name="type">
    </div>
    <div class="form-group">
    <label for="_Room.ROOMNO">Room No. </label>
        <input value="{{_Room.ROOMNO}}" [(ngModel)]="_Room.ROOMNO" name="roomNo">
        </div>
        </form>
        <button (click)="updateRoom()">Update </button>
        <button (click)="deleteRoom()">Delete</button>
    </div>
     `
})
export class RoomComponent{
        @Input() _Room: any;
        constructor(private RoomService : RoomService,private activatedRoute: ActivatedRoute){
            
        }
        ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.RoomService.findRoom(id);
            this.RoomService.roomEvent.subscribe(data => this._Room = data,() => console.log("ERROR"),()=> console.log(this._Room));
                
            })
        }

        deleteRoom(){
            this.RoomService.deleteRoom(this._Room.ID);
        }
        updateRoom(){
            this.RoomService.saveRoom(this._Room);
        }

        
} 