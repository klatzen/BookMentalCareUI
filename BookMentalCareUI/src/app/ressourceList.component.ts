import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges } from '@angular/core';
import { RessourceService } from './services/ressource.service';
import { BookingService } from './services/booking.service';

@Component({
    selector: 'resList',
    template: `
    <table>
        <thead>
            <td>ID</td>
            <td>Name</td>
            <td>Type</td>
        </thead>
        <tbody>
        <div *ngIf="route == '/booking'">
            <tr *ngFor="let ressource of _AvalibleRessources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <button (click)="OnClick(ressource)">Add</button>
            </tr>
            
            </div>
        <div *ngIf="route != '/booking'">
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

export class RessourceListComponent {

    _Ressources = [];
    _Bookings = [];
    _Units: Unit[];
    _AvalibleRessources = [];
    @Output() sendRessource: EventEmitter<any> = new EventEmitter();
    @Output() Unit;
    @Input() startTime;
    @Input() endTime;
    @Input() removeUnit;

    route: any;
    userFilter: any = { Id: '' };

    constructor(private resService: RessourceService, private bookService: BookingService) {
        this._Bookings = bookService.findBookings();
    }

    ngOnInit() {
        this.route = window.location.pathname;
        if (this.route == '/booking') {
            this.resService.findAvailibleRessources(this.startTime, this.endTime);
            this.resService.resEvent.subscribe(data => {
                this._AvalibleRessources = data;

            });
        } else {
            this.resService.resEvent.subscribe(data => this._Ressources = data);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.removeUnit);
        if(changes.removeUnit.currentValue != undefined){
             let res = this._AvalibleRessources.find(x => x.Id == this.removeUnit.RessourceId);
            if (res === undefined) {
                this.removeUnit.Ressource.units.push(this.removeUnit);
                this._AvalibleRessources.push(this.removeUnit.Ressource);
            } else {
                res.units.push(this.removeUnit);
            }
            this.removeUnit = null;
        }
        /*console.log(this.removeUnit);
        if (this.removeUnit != null) {
            let res = this._AvalibleRessources.find(x => x.Id == this.removeUnit.RessourceId);
            if (res === undefined) {
                this.removeUnit.Ressource.units.push(this.removeUnit);
                this._AvalibleRessources.push(this.removeUnit.Ressource);
            } else {
                res.units.push(this.removeUnit);
            }
        }
        console.log(this._AvalibleRessources);
        this.removeUnit = null;*/
    }

     OnClick(Res) {
        let unit = Res.units.pop();
        unit.Ressource = Res;
        this.sendRessource.emit(unit);
        if (Res.units.length == 0) {
            this._AvalibleRessources.splice(this._AvalibleRessources.indexOf(Res), 1);
        }
    }
}

interface Unit {
    Id: number,
    SerialNo: string,
    RessourceId: number,
    Ressource: any;
}

