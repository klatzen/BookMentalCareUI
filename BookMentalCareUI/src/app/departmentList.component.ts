import {Component, EventEmitter, Output} from '@angular/core';
import {DepartmentService} from './services/department.service';


@Component({
    selector: 'depList',
    template: `
    <form class="form-inline">

    <div class="col-xs-3" id="space-ontop">
        <label> Search</label>
        <input class="form-control"  [(ngModel)]="userFilter.NAME" placeholder="department name" name="search">
        </div>
    </form>
    
    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th></th>
        </tr>
    </thead>
    <tbody *ngIf="route == '/departments'">
        <tr *ngFor="let Department of _Departments | filterBy: userFilter">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            <button [routerLink]="['/department',Department.ID]" class="btn btn-secondary">Edit</button>
        </tr>
            <button [routerLink]="['/departmentCreate']" class="btn btn-secondary" >Create new</button>
    </tbody>
    <tbody *ngIf="route != '/departments'">
        <tr *ngFor="let Department of _Departments | filterBy: userFilter">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            <button (click)="onClick(Department)" class="btn btn-secondary">Add</button>
        </tr>
    </tbody>
    </table>
    `
})
export class DepartmentListComponent{
        _Departments = [];
        userFilter: any = { NAME: '' };
        @Output() sendDepartment : EventEmitter<any> = new EventEmitter();
        @Output() Department;
        

        route : any;

        ngOnInit(){
            this.route = window.location.pathname;
        }

        onClick(Department){
            this.sendDepartment.emit(Department);
        }
        
        constructor(private departmentService : DepartmentService){
            this._Departments = departmentService.findDepartments();

        }      

        /*<div *ngIf="route != '/departments'">
        <a (click)="onClick(Department)">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            </a>
            </div>*/
}