import {Component, Output, EventEmitter} from '@angular/core';
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
            <tr *ngFor="let ressource of _Ressources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <button [routerLink]="['/unit',ressource.Id]">Se Eksemplarer</button>
                <button (click)="OnClick(Ressource)">Add</button>
            </tr>
            <button [routerLink]="['/createRessource']">Opret ny</button>
        </tbody>
    </table>

    `
})

export class RessourceListComponent{

    _Ressources = [];
    _Bookings = [];
     @Output() sendRessource : EventEmitter<any> = new EventEmitter();
     @Output() Ressource;


    userFilter : any = {Id: ''};

    constructor(private resService:RessourceService, private bookService : BookingService){
        this._Ressources = resService.findRessources();
        this._Bookings = bookService.findBookings();
    }

    OnClick(Ressource) {
        this.sendRessource.emit(Ressource);
    }


}

