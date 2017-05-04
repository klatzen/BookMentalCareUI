import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'ressource',
    template: `
    <div *ngIf="_ressource != null; else error ">
    <form>
    <div class="form-group">
    <label for="_ressource.Id">Id : {{_ressource.Id}}</label>
    </div>
    <div class="form-group">
    <label for="_ressource.Name">Name</label>
    <input value="{{_ressource.Name}}" [(ngModel)]="_ressource.Name" name="name">
    </div>
    <div class="form-group">
    <label for="_ressource.Type">Type</label>
    <input value="{{_ressource.Type}}" [(ngModel)]="_ressource.Type" name="type">
    </div>
    <button (click)="saveUpdate()">Redigér</button>
    <button (click)="deleteRes()">Slet</button>
    </form>
    </div>
    `
})

export class RessourceComponent{

     @Input() _ressource : any;
     error : any = console.log("not found");
         
    constructor(private resService:RessourceService, private activatedRoute: ActivatedRoute){
    }

    ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.resService.findRessource(id);
            this.resService.resEvent.subscribe(data => this._ressource = data);
        })
    }

    saveUpdate(){
        this.resService.saveRessource(this._ressource);
    }

    deleteRes(){
        this.resService.deleteRessource(this._ressource.Id);
    }

}