import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector:'edit-unit',
    template:`
        <div *ngIf="_unit != null">
    <form>
    <div class="form-group">
    <label for="*ngIf='_unit.Id'">Id : {{_unit.Id}}</label>
    </div>
    <div class="form-group">
    <label for="ngIf='_unit.SerialNo'">Serial Number</label>
    <input value="{{_unit.SerialNo}}" [(ngModel)]="_unit.SerialNo" name="serialNo">
    </div>
    <div class="form-group">
    <label for="ngIf='_unit.RessourceId'">Ressource ID</label>
    <input value="{{_unit.RessourceId}}" [(ngModel)]="_unit.RessourceId" name="resId">
    </div>
    <button (click)="saveUpdate()">Redigér</button>
    <button (click)="deleteUnit()">Slet</button>
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

