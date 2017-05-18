import {Component, Input, ViewContainerRef} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {Overlay} from 'angular2-modal';
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
        <button (click)="onClick()" class="btn btn-secondary" id="delete-btn">Delete</button>
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
         
    constructor(private resService:RessourceService, private activatedRoute: ActivatedRoute, private modal:Modal, overlay: Overlay, vcRef: ViewContainerRef) { 
        overlay.defaultViewContainer = vcRef;
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
    onClick() {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Confirm deletion of department')
        .body(`
            <p>Are you sure?</p>
            `).okBtn('Delete')
            .okBtnClass('btn btn-info')
        .open().then((dialogRef) => dialogRef.result /* this is the promise of the result */) 
            .then(result => this.deleteRes())
            .catch(err => alert("CANCELED"));
  }

}