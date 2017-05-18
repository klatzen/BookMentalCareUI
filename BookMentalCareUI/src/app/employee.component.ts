import { Component, Input, ViewContainerRef } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { ActivatedRoute } from '@angular/router';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
    selector: 'emp',
    template: ` 
     <div *ngIf="_Employee != null">
     <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3">
        <label class="control-label" for="_Employee.FNAME"> Front Name</label>
        <input class="form-control" value="{{_Employee.FNAME}}" [(ngModel)]="_Employee.FNAME" name="first">
        </div>

        <div class="col-xs-3">
        <label class="control-label" for="_Employee.LNAME">Last Name </label>
        <input class="form-control" value="{{_Employee.LNAME}}" [(ngModel)]="_Employee.LNAME" name="last">
        </div>

        <div class="col-xs-3">
        <label class="control-label" for="_Employee.TITLE"> Title </label>
        <input class="form-control" value="{{_Employee.TITLE}}" [(ngModel)]="_Employee.TITLE" name="title">
        </div>

        <div class="col-xs-3">
        <label class="control-label" for="_Employee.INITIALS"> Initials </label>
        <input class="form-control" value="{{_Employee.INITIALS}}" [(ngModel)]="_Employee.INITIALS" name ="initials">
        </div>
    </div>
    
    <div class="input-group">
        <div class="col-sm-offset-2 col-sm-10">
            <span class="input-group-btn input-space">
            <button (click)="updateEmployee()" class="btn btn-secondary">Save changes</button>
            <button (click)="onClick()" class="btn btn-secondary" id="delete-btn">Delete</button>
            </span>
        </div>
    </div>
    </form>
    </div>
     `
})
export class EmployeeComponent {
    @Input() _Employee: any;
    constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, public modal:Modal, overlay: Overlay, vcRef: ViewContainerRef) { 
        overlay.defaultViewContainer = vcRef;
    }
    ngOnInit() {
        this.activatedRoute.params.map(params => params['initials']).subscribe(initals => {
            this.employeeService.findEmployee(initals);
            this.employeeService.empEvent.subscribe(data => this._Employee = data, () => console.log("ERROR"), () => console.log(this._Employee));

        })
    }

    deleteEmployee() {
        this.employeeService.deleteEmployee(this._Employee.INITIALS);
    }
    updateEmployee() {
        this.employeeService.saveEmployee(this._Employee);
    }
    onClick() {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Confirm deletion of employee')
        .body(`
            <p>Are you sure?</p>
            `).okBtn('Delete')
            .okBtnClass('btn btn-info')
        .open().then((dialogRef) => dialogRef.result /* this is the promise of the result */) 
            .then(result => this.deleteEmployee())
            .catch(err => alert("CANCELED"));
  }


} 