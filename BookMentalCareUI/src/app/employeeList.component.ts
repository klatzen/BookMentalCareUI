import {Component, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
    selector: 'empList',
    template: `
    <input type="text" [(ngModel)]="userFilter.INITIALS" placeholder="name, department">
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Front Name</td>
            <td>Last Name</td>
            <td>Title</td>
            <td>Initials</td>
            <td>Department</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Employee of _Employees | filterBy: userFilter">
        <a [routerLink]="['employee',Employee.INITIALS]">
            <td>{{Employee.ID}}</td>
            <td>{{Employee.FNAME}}</td>
            <td>{{Employee.LNAME}}</td>
            <td>{{Employee.TITLE}}</td>
            <td>{{Employee.INITIALS}}</td>
            <td>{{Employee.DEPARTMENT}}</td></a>
            <button (click)="OnClick(Employee)">Add</button>
        </tr>
    </tbody>
    </table>
    `
})
export class EmployeeListComponent{
        @Output() Employee;
        @Output() sendEmployee : EventEmitter<any> = new EventEmitter();
        _Employees = [];
        userFilter: any = { INITIALS: '',DEPARTMENT:'' };

        constructor(private employeeService : EmployeeService){
            this._Employees = employeeService.findEmployees();
        }      

        OnClick(Employee){
            this.sendEmployee.emit(Employee);
        }
}