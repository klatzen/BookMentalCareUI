import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector:'new-unit',
    template: `
    <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3">
        <label for="Unit.SerialNo"> SerialNo</label>
        <input  class="form-control" [(ngModel)]="Unit.SerialNo" name="serialNo">
        </div>
        
        <div class="col-xs-3">
        <label for="Unit.Ressource">Ressource</label>
        <input  class="form-control" [(ngModel)]="Unit.Ressource.Id" name="ressource" value={{Unit.Ressource.Id}} >
        </div>
      </div>
      <button (click)="createUnit(Unit)" class="btn btn-secondary">Create Unit</button>
        </form>
    `
})

export class NewUnitComponent{
    @Input() Unit : Unit = {Id:0, SerialNo:'',Ressource:''};
    resId;

    constructor(private ressourceService : RessourceService, private activatedRouter :  ActivatedRoute, private cookieService : CookieService){

    }

    createUnit(){
        this.ressourceService.saveUnit(this.Unit);
    }


    ngOnInit(){
        this.resId = this.cookieService.get('resId');
        this.ressourceService.findRessource(this.resId);
        this.ressourceService.resEvent.subscribe(data => this.Unit.Ressource = data);
        this.cookieService.remove('resId');
    }

}



interface Unit{
    Id,
    SerialNo,
    Ressource
}