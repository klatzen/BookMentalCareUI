import {Component, Output, EventEmitter, Input, SimpleChanges} from '@angular/core';
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
            <td *ngIf="Employee.DEPARTMENT">{{Employee.DEPARTMENT.NAME}}</td></a>
            <button *ngIf="route != '/employees'" (click)="OnClick(Employee)">Add</button>
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
        @Input() removeEmp;
        route:any;

        ngOnInit(){
            this.route = window.location.pathname;
            if(this.route != "/employees"){
                this._Employees = this.employeeService.findAvailEmployees(this.startTime,this.endTime);
            }
            else{
                this._Employees = this.employeeService.findEmployees();
            }
        }
        ngOnChanges(changes: SimpleChanges){
            if(this.removeEmp !== null){
                this._Employees.push(this.removeEmp);
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