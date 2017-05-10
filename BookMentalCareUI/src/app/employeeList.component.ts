import {Component, Output, EventEmitter, Input, Injectable, SimpleChanges} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Injectable()
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
            <td *ngIf="Employee.DEPARTMENT">{{Employee.DEPARTMENT.NAME}}</td></a>
            <button (click)="OnClick(Employee)">Add</button>
        </tr>
    </tbody>
    </table>
    `
})
export class EmployeeListComponent{
        @Output() Employee;
        @Output() sendEmployee : EventEmitter<any> = new EventEmitter();
        @Input() _Employees = [];
        userFilter: any = { INITIALS: '',DEPARTMENT:'' };
        @Input() startTime;
        @Input() endTime;

        ngOnInit(){
            if(window.location.pathname == "/newBooking"){
                this._Employees = this.employeeService.findAvailEmployees(this.startTime,this.endTime);
            }
            else{
                this._Employees = this.employeeService.findEmployees();
            }
        }

        constructor(private employeeService : EmployeeService){
        }      

        OnClick(Employee){
            this.sendEmployee.emit(Employee);
            this._Employees.splice(this._Employees.indexOf(Employee), 1);
        }

        addEmp(emp){
            console.log(emp);
            this._Employees.push(emp);
            console.log(this._Employees);
        }
}