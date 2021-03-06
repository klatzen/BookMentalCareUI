import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges } from '@angular/core';
import { RessourceService } from './services/ressource.service';
import { BookingService } from './services/booking.service';

@Component({
    selector: 'resList',
    template: `
    <table class="table">
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th></th>
            <th></th>
        </thead>
        <tbody *ngIf="_AvalibleRessources.length < 1 && route != '/ressources'">
            <td>No available ressources</td>
        </tbody>
        <tbody *ngIf="route != '/ressources'">
            <tr *ngFor="let ressource of _AvalibleRessources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <button (click)="OnClick(ressource)" class="btn btn-secondary">Add</button>
            </tr>
        </tbody>
        <tbody *ngIf="route == '/ressources'">
            <tr *ngFor="let ressource of _Ressources | filterBy: userFilter">
                <td>{{ressource.Id}}</td>
                <td>{{ressource.Name}}</td>
                <td>{{ressource.Type}}</td>
                <td><button type="button" [routerLink]="['/unit',ressource.Id]" class="btn btn-secondary">See units</button></td>
                <td><button type="button" [routerLink]="['/ressource',ressource.Id]" class="btn btn-secondary">Edit</button></td>
            </tr>
            <button [routerLink]="['/createRessource']" class="btn btn-secondary">Create new</button>
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
        if (this.route != '/ressources') {
            this.resService.findAvailibleRessources(this.startTime, this.endTime);
            this.resService.resEvent.subscribe(data => {
                this._AvalibleRessources = data;
            });
        } else {
            this.resService.findRessources();
            this.resService.resEvent.subscribe(data => this._Ressources = data);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.removeUnit.currentValue != undefined){
             let res = this._AvalibleRessources.find(x => x.Id == this.removeUnit.RessourceId);
            if (res === undefined) {
                if(this.removeUnit.Ressource.units == null){
                    this.removeUnit.Ressource.units = [];
                }
                this.removeUnit.Ressource.units.push(this.removeUnit);
                this._AvalibleRessources.push(this.removeUnit.Ressource);
            } else {
                res.units.push(this.removeUnit);
            }
            this.removeUnit = null;
        }
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

