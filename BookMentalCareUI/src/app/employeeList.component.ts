import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
    selector: 'empList',
    template: `
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
        <tr *ngFor="let Employee of _Employees">
            <td>{{Employee.ID}}</td>
            <td>{{Employee.FNAME}}</td>
            <td>{{Employee.LNAME}}</td>
            <td>{{Employee.TITLE}}</td>
            <td>{{Employee.INITIALS}}</td>
        </tr>
    </tbody>
    </table>
    `
})
export class EmployeeListComponent{
        _Employees = [];


        constructor(private employeeService : EmployeeService){
            this._Employees = employeeService.findEmployees();
        }      
}