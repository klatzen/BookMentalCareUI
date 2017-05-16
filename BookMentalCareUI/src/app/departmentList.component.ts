import {Component, EventEmitter, Output} from '@angular/core';
import {DepartmentService} from './services/department.service';


@Component({
    selector: 'depList',
    template: `
    <form class="form-inline">
    <div class="form-group">
        <label>Search</label>
        <input class="form control" type="text" [(ngModel)]="userFilter.NAME" placeholder="department name" name="search">
    </div>
    </form>
    
    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
        </tr>
    </thead>
    <tbody *ngIf="route == '/departments'">
        <tr *ngFor="let Department of _Departments | filterBy: userFilter">
        <a [routerLink]="['/department',Department.ID]">
            <td>{{Department.ID}}</td></a>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
        </tr>
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