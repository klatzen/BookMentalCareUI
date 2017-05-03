import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
    selector: 'empList',
    template: `
    <input type="text" [(ngModel)]="userFilter.INITIALS" placeholder="name">
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Front Name</td>
            <td>Last Name</td>
            <td>Title</td>
            <td>Initials</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Employee of _Employees | filterBy: userFilter">
        <a [routerLink]="['employee',Employee.INITIALS]">
            <td>{{Employee.ID}}</td>
            <td>{{Employee.FNAME}}</td>
            <td>{{Employee.LNAME}}</td>
            <td>{{Employee.TITLE}}</td>
            <td>{{Employee.INITIALS}}</td></a>
        </tr>
    </tbody>
    </table>
    `
})
export class EmployeeListComponent{
        _Employees = [];
        userFilter: any = { INITIALS: '' };

        constructor(private employeeService : EmployeeService){
            this._Employees = employeeService.findEmployees();
        }      
}