import {Component, Output, EventEmitter, OnInit, Input, SimpleChanges} from '@angular/core';
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
     @Input() startTime;
     @Input() endTime;
     @Input() removeUnit;

    route : any;
    userFilter : any = {Id: ''};

    constructor(private resService:RessourceService, private bookService : BookingService){
       resService.findRessources();
        this._Bookings = bookService.findBookings();
        this._Units = resService.findAvailibleUnits(this.startTime, this.endTime);
    }

    ngOnInit(){
            this.route = window.location.pathname;
            this.resService.resEvent.subscribe(data => this._Ressources = data);
            this.resService.unitEvent.subscribe(data => {
                this._AvalibleRessources = [];
                data.forEach(u => this._Ressources.forEach(r => {
                if(u.RessourceId == r.Id){
                    if(this._AvalibleRessources.length > 0){
                    for(var res of this._AvalibleRessources){
                        console.log('korer');
                        if(res.Id == r.Id){
                            break;
                        }else{
                            this._AvalibleRessources.push(r);  
                        }
                    } 
                    }else{
                        this._AvalibleRessources.push(r);
                    }
                }
            }))});    
        }

        ngOnChanges(changes: SimpleChanges){
            console.log('ich bin called');
            if(this.removeUnit){
                this._Units.push(this.removeUnit);
                for(var element of this._AvalibleRessources){
                    if(!(element.Id == this.removeUnit.Ressource.Id)){
                        this._AvalibleRessources.push(this.removeUnit.Ressource);
                        console.log(this._AvalibleRessources);
                        break;
                    }
                }
            }
        }

    OnClick(id:number) {
        for(var unit of this._Units) {
    if(unit.RessourceId == id) {
        unit.Ressource = this._AvalibleRessources.find(Ressource => Ressource.Id == unit.RessourceId);
        this.sendRessource.emit(unit);
        var index = this._Units.indexOf(unit);
        if(index > -1){
            this._Units.splice(index, 1);
        }
        break
        }
    }
        var del = true;
        this._AvalibleRessources.forEach(res => {
            this._Units.forEach(uni => {
                if(res.Id == uni.RessourceId){
                    del = false;
                }
            });
            if(del){
            this._AvalibleRessources.splice(this._AvalibleRessources.indexOf(res), 1);
        }
        del = true;
        
        });


    }
}

interface Unit{
    Id: number,
    SerialNo: string,
    RessourceId: number,
    Ressource: any;
}

