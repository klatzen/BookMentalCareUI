import {Component, Input} from '@angular/core';
import {RoomService} from './services/room.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'pat',
    template: ` 
     <div *ngIf="_Room != null">
     <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3"> 
        <label for="_Room.TYPE"> Type</label>
        <input class="form-control" value="{{_Room.TYPE}}" [(ngModel)]="_Room.TYPE" name="type">
        </div>

        <div class="col-xs-3"> 
        <label for="_Room.ROOMNO">Room No. </label>
        <input class="form-control" value="{{_Room.ROOMNO}}" [(ngModel)]="_Room.ROOMNO" name="roomNo" readonly>
        </div>
    </div>
    <div class="input-group">
        <div class="col-sm-offset-2 col-sm-10">
            <span class="input-group-btn input-space">
            <button (click)="updateRoom()" class="btn btn-secondary">Update</button>
            <button (click)="deleteRoom()" class="btn btn-secondary" id="delete-btn">Delete</button>
            </span>
        </div>
    </div>
    </form>
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