import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';

@Component({
    selector: 'ressource',
    template: `
    <form>
    <input #textbox type="text">
    </form>
    <div *ngFor="let ressource of _ressources">
    <div ngIf="ressource.Id == id">
    <label>ID: {{ressource.Id}}</label>
    <label>Name: {{ressource.Name}}</label>
    <label>Type:{{ressource.Type}}</label>
    <label>Units: {{ressource.Unit}}</label>
    </div>
    </div>
    `
})

export class RessourceComponent{

     _ressources = [];

     @Input() id
    
    onClick(id:number){
        this._ressources = this.resService.findRessources();
    }
    
    constructor(private resService:RessourceService){
        
}
}