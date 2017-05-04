import {Component} from '@angular/core';
import {RessourceService} from './services/ressource.service';

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
                <button [routerLink]="['/ressource',ressource.Id]">Details</button>
            </tr>
            <button [routerLink]="['/createRessource']">Opret ny</button>
        </tbody>
    </table>

    `
})

export class RessourceListComponent{

    _Ressources = [];

    userFilter : any = {Id: ''};

    constructor(private resService:RessourceService){
        this._Ressources = resService.findRessources();
    }
}
