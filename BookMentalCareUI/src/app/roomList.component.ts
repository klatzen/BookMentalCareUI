import {Component} from '@angular/core';
import {RoomService} from './services/room.service';
import{CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Component({
    selector: 'roomList',
    template: `
    <form class="form-inline">
    <div class="form-group">
        
        <label for="startTime">Start Time</label>
        <input class="form-control" type="date" [(ngModel)]="startTime" name="startTime">
        
        <label for="endTime">End Time</label>
        <input class="form-control" type="date" [(ngModel)]="endTime" name="endTime">

        <button (click)="createRoom()" class="btn btn-secondary">Check Period</button>

    </div>
    </form>
    <hr>

    <form class="form-inline">
    <div class="form-group">
        <label>Search</label>
        <input class="form-control" type="text" [(ngModel)]="userFilter.TYPE" placeholder="room type" name="search">
    </div>
    </form>

    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Room No.</th>
            <th>Department</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Room of _Rooms | filterBy: userFilter">
            <td>{{Room.ID}}</td>
            <td>{{Room.TYPE}}</td>
            <td>{{Room.ROOMNO}}</td>
            <td *ngIf="Room.DEPARTMENT">{{Room.DEPARTMENT.NAME}} </td>
            <td><button *ngIf="showBtn" [routerLink]="['/room',Room.ID]" class="btn btn-secondary">Edit</button></td>
            <td *ngIf="!showBtn"><button (click)="createBooking(Room)" class="btn btn-secondary" id="delete-btn">Create Booking</button></td>
        </tr>
    </tbody>
    </table>
    <button [routerLink]="['/roomCreate']" class="btn btn-secondary" >Create new</button>
    
    `
})
export class RoomListComponent{
        _Rooms = [];
        userFilter: any = { TYPE: '' };
        startTime: any= ' ';
        endTime:any = ' ';
        showBtn:boolean = true;
        constructor(private RoomService : RoomService, private cookieService : CookieService, private router : Router){
            this._Rooms = RoomService.findRooms();
        }      

        createRoom(){
            this.showBtn = false;
            this._Rooms = this.RoomService.findAvailRooms(this.startTime,this.endTime);
        }
        
        createBooking(Room){
            this.cookieService.putObject("room",Room);
            this.cookieService.put("startTime",this.startTime);
            this.cookieService.put("endTime",this.endTime);
            this.router.navigate(['booking']);
        }

        ngOnInit(){
            this.cookieService.remove("room");
            this.cookieService.remove("startTime");
            this.cookieService.remove("endTime");
        }
}