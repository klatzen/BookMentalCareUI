import {Component} from '@angular/core';
import {RoomService} from './services/room.service';

@Component({
    selector: 'empList',
    template: `
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
        </tr>
    </tbody>
    </table>
    `
})
export class RoomListComponent{
        _Rooms = [];
        userFilter: any = { ROOMNO: '' };

        constructor(private RoomService : RoomService){
            this._Rooms = RoomService.findRooms();
        }      
}