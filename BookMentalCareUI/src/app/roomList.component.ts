import {Component} from '@angular/core';
import {RoomService} from './services/room.service';

@Component({
    selector: 'roomList',
    template: `
    <input type="text" [(ngModel)]="startTime" placeholder="Start Time">
    <input type="text" [(ngModel)]="endTime" placeholder="End Time">
    <button (click)="createRoom()"> Check Period</button>
    <br>
    <hr>

    <input type="text" [(ngModel)]="userFilter.ROOMNO" placeholder="name">
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Type</td>
            <td>Room No.</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Room of _Rooms | filterBy: userFilter">
        <a [routerLink]="[Room.ID]">
            <td>{{Room.ID}}</td>
            <td>{{Room.TYPE}}</td>
            <td>{{Room.ROOMNO}}</td></a>
            <td><button (click)="createBooking(Room)">Create Booking</button> </td>
        </tr>
    </tbody>
    </table>
    
    `
})
export class RoomListComponent{
        _Rooms = [];
        userFilter: any = { ROOMNO: '' };
        startTime: any= '';
        endTime:any = '';
        constructor(private RoomService : RoomService){
            this._Rooms = RoomService.findRooms();
        }      

        createRoom(){
            this._Rooms = this.RoomService.findAvailRooms(this.startTime,this.endTime);
        }
        createBooking(Room){

        }
}