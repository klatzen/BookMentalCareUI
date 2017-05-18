import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector:'new-unit',
    template: `
    <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3">
        <label for="Unit.SerialNo"> SerialNo</label>
        <input  [(ngModel)]="Unit.SerialNo" name="serialNo">
        </div>
        
        <div class="col-xs-3">
        <label for="Unit.Ressource">Ressource</label>
        <input  [(ngModel)]="Unit.Ressource" name="ressource" value="resId">
        </div>
      </div>
      <button (click)="createUnit(Unit)" class="btn btn-secondary">Create Unit</button>
        </form>
    `
})

export class NewUnitComponent{
    @Input() Unit : Unit = {Id:0, SerialNo:'',Ressource:''};
    resId;


    constructor(private ressourceService : RessourceService, private activatedRouter :  ActivatedRoute){

    }

    createUnit(){
        this.Unit.Ressource = this.resId;
        this.ressourceService.saveUnit(this.Unit);
    }


    ngOnInit(){
        this.activatedRouter.params.map(params => params['Id']).subscribe(id => {
        this.ressourceService.findRessource(id);
        this.resId = id});
        console.log(this.resId);
        
    }
}



interface Unit{
    Id,
    SerialNo,
    Ressource
}