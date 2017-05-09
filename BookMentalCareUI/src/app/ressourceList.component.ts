import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {BookingService} from'./services/booking.service';

@Component({
    selector: 'resList',
    template:`
    <table>
        <thead>
            <td>ID</td>
            <td>Name</td>
            <td>Type</td>
        </thead>
        <tbody>
        <div *ngIf="route == '/newBooking'">
            <tr *ngFor="let ressource of _AvalibleRessources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <button (click)="OnClick(ressource.Id)">Add</button>
            </tr>
            
            </div>
        <div *ngIf="route != '/newBooking'">
            <tr *ngFor="let ressource of _Ressources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <button [routerLink]="['/unit',ressource.Id]">Se Eksemplarer</button>
            </tr>
            <button [routerLink]="['/createRessource']">Opret ny</button>
            </div>
        </tbody>
    </table>

    `
})

export class RessourceListComponent{

    _Ressources = [];
    _Bookings = [];
    _Units:Unit[];
    _AvalibleRessources = [];
     @Output() sendRessource : EventEmitter<any> = new EventEmitter();
     @Output() Unit;

    route : any;
    userFilter : any = {Id: ''};

    constructor(private resService:RessourceService, private bookService : BookingService){
       resService.findRessources();
        this._Bookings = bookService.findBookings();
        this._Units = resService.findAvailibleUnits('16/05-2017', '20/05-2017');
        
            console.log(this._Units);
    }

    ngOnInit(){
            this.route = window.location.pathname;
            this.resService.resEvent.subscribe(data => this._Ressources = data);
            this.resService.unitEvent.subscribe(data => {data.forEach(u => this._Ressources.forEach(r => {
                if(u.RessourceId = r.Id){
                    this._AvalibleRessources.push(r);
                    
                }
            }))});    
        }

    OnClick(id:number) {
        for(var unit of this._Units) {
    if(unit.RessourceId == id) {
        this.sendRessource.emit(unit);
        var index = this._Units.indexOf(unit);
        if(index > -1){
            this._Units.splice(index, 1);
        }
        break
    }
}
    }
}

interface Unit{
    Id: number,
    SerialNo: string,
    RessourceId: number
}

