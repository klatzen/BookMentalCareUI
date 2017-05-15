import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';

@Component({
    selector: 'saveRes',
    template:`
    <form class="form">
        <div class="form-group">
            <div class="col-xs-3">  
            <label for="_ressource.Name">Name</label>
            <input class="form-control" [(ngModel)]="_ressource.Name" name="name">
            </div>
            <div class="col-xs-3">  
            <label for="_ressource.Type">Type</label>
            <input class="form-control" [(ngModel)]="_ressource.Type" name="type">
            </div>
        </div>
        <div class="input-group">
        <div class="col-sm-offset-2 col-sm-10">
            <span class="input-group-btn input-space">
            <button (click)="saveRes()" class="btn btn-secondary" >Create Ressource</button>
            </span>
        </div>
      </div>
    </form>
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