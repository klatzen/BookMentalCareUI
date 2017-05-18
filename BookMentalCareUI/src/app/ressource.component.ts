import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'ressource',
    template: `
    <div *ngIf="_ressource != null; else error ">
    <form class="form-horizontal">
    <div class="form-group">
         
        <div class="col-xs-3"> 
        <label for="_ressource.Id">Id</label>
        <input class="form-control" value="{{_ressource.Id}}" readonly>
        </div>

        <div class="col-xs-3">  
        <label for="_ressource.Name">Name</label>
        <input class="form-control" value="{{_ressource.Name}}" [(ngModel)]="_ressource.Name" name="name">
        </div>

        <div class="col-xs-3"> 
        <label for="_ressource.Type">Type</label> 
        <input class="form-control" value="{{_ressource.Type}}" [(ngModel)]="_ressource.Type" name="type">
        </div>

        <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="saveUpdate()" class="btn btn-secondary">Save changes</button>
        <button (click)="deleteRes()" class="btn btn-secondary" id="delete-btn">Delete</button>
        </span>
        </div>
        </div>
    </div>
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
            console.log(this.resService.findRessource(id));
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