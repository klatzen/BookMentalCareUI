import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector:'edit-unit',
    template:`
        <div *ngIf="_unit != null">
    <form class="form-horizontal">
    <div class="form-group">

    <div class="col-xs-3"> 
    <label for="*ngIf='_unit.Id'">Id</label>
    <input class="form-control" value="{{_unit.Id}}" readonly>
    </div>

    <div class="col-xs-3"> 
    <label for="ngIf='_unit.SerialNo'">Serial Number</label>
    <input class="form-control" value="{{_unit.SerialNo}}" [(ngModel)]="_unit.SerialNo" name="serialNo">
    </div>
    </div>

    <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="saveUpdate()" class="btn btn-secondary">Save changes</button>
        <button (click)="deleteUnit()" class="btn btn-secondary" id="delete-btn">Delete</button>
        </span>
        </div>
    </div>
    </form>
    </div>
    `
})

export class EditUnitComponent{
    @Input() _unit : any;

    constructor(private resService: RessourceService, private activatedRoute:ActivatedRoute){
            
    }
    ngOnInit(){
            this.activatedRoute.params.map(params => params['Id']).subscribe(id => {
            this.resService.findUnit(id);
            this.resService.unitEvent.subscribe(data => this._unit = data,() => console.log("ERROR"),()=> console.log(this._unit));
                
            })
        }


    saveUpdate(){
        this.resService.saveUnit(this._unit);
    }

    deleteUnit(){
        this.resService.deleteUnit(this._unit.Id);
    }
}

