import {DepartmentService} from './services/department.service';
import {ActivatedRoute, Router} from '@angular/router';

import { Component, ViewContainerRef, Input } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
    selector: 'dep',
    template: ` 
     <div *ngIf="_Department != null">
     <form class="form-horizontal">
     <div class="form-group">
     
        <div class="col-xs-3"> 
        <label for="_Department.NAME"> Name</label>
        <input class="form-control" value="{{_Department.NAME}}" [(ngModel)]="_Department.NAME" name="name">
        </div>

        <div class="col-xs-3"> 
        <label for="_Department.LOCATION">Location </label>
        <input class="form-control" value="{{_Department.LOCATION}}" [(ngModel)]="_Department.LOCATION" name="location">
        </div>

    </div>
        <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="updateDepartment()" class="btn btn-secondary">Save changes</button>
        <button (click)="onClick()" class="btn btn-secondary" id="delete-btn">Delete</button>
        </span>
        </div>
    </div>
        </form>
    </div>
     `
})
export class DepartmentComponent{
        @Input() _Department: any;
        constructor(private departmentService : DepartmentService,private activatedRoute: ActivatedRoute, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private router:Router){
            overlay.defaultViewContainer = vcRef;
        }
        ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.departmentService.findDepartment(id);
            this.departmentService.depEvent.subscribe(data => this._Department = data,() => console.log("ERROR"),()=> console.log(this._Department));
                
            })
        }

        deleteDepartment(){
            this.departmentService.deleteDepartment(this._Department.ID);
        }
        updateDepartment(){
            this.departmentService.saveDepartment(this._Department);
        }
        testMe(){
            console.log("virker bare");
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
            .then(result => this.deleteDepartment())
            .catch(err => alert("CANCELED"));
  }

        
} 