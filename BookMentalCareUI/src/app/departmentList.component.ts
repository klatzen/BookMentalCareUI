import {Component, EventEmitter, Output} from '@angular/core';
import {DepartmentService} from './services/department.service';


@Component({
    selector: 'depList',
    template: `
    <input type="text" [(ngModel)]="userFilter.NAME" placeholder="name">
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Location</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Department of _Departments | filterBy: userFilter">
        <div *ngIf="route == '/departments'">
        <a [routerLink]="[Department.ID]">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            </a>
            </div>
            <div *ngIf="route != '/departments'">
        <a (click)="onClick(Department)">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            </a>
            </div>
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
}