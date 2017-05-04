import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';

@Component({
    selector: 'saveRes',
    template:`
    <div>
    <form>
    <div class="form-group">
    <label for="_ressource.Id">Id</label>
    </div>
    <div class="form-group">
    <label for="_ressource.Name">Name</label>
    <input [(ngModel)]="_ressource.Name" name="name">
    </div>
    <div class="form-group">
    <label for="_ressource.Type">Type</label>
    <input [(ngModel)]="_ressource.Type" name="type">
    </div>
    <button (click)="saveRes()">Opret</button>
    </form>
    </div>
    `
})

export class NewRessourceComponent{
    _ressource: Ressource = {Name:'',Type:''};


    saveRes(){
        this.resService.saveRessource(this._ressource);
    }

    constructor(private resService: RessourceService){

    }
}

interface Ressource{
    Name,
    Type
}