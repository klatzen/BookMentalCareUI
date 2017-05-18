import {Component,ViewContainerRef, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

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
        <button (click)="onClick()" class="btn btn-secondary" id="delete-btn">Delete</button>
        </span>
        </div>
    </div>
    </form>
    </div>
    `
})

export class EditUnitComponent{
    @Input() _unit : any;

    constructor(private resService: RessourceService, private activatedRoute:ActivatedRoute,public modal:Modal, overlay: Overlay, vcRef: ViewContainerRef){
            overlay.defaultViewContainer = vcRef;
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
    onClick() {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Confirm deletion of unit')
        .body(`
            <p>Are you sure?</p>
            `).okBtn('Delete')
            .okBtnClass('btn btn-info')
        .open().then((dialogRef) => dialogRef.result /* this is the promise of the result */) 
            .then(result => this.deleteUnit())
            .catch(err => alert("CANCELED"));
  }
}

