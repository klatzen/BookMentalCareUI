import {Component} from '@angular/core';
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
        <a [routerLink]="[Department.ID]">
            <td>{{Department.ID}}</td>
            <td>{{Department.NAME}}</td>
            <td>{{Department.LOCATION}}</td>
            </a>
        </tr>
    </tbody>
    </table>
    `
})
export class DepartmentListComponent{
        _Departments = [];
        userFilter: any = { NAME: '' };

        constructor(private departmentService : DepartmentService){
            this._Departments = departmentService.findDepartments();
        }      
}