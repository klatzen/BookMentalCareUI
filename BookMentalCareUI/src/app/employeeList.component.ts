import {Component, Output, EventEmitter, Input, SimpleChanges} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
    selector: 'empList',
    template: `
    <form class="form-inline">
    <div class="form-group">
        <label>Search</label>
        <input class="form-control" type="text" [(ngModel)]="userFilter.INITIALS" placeholder="name" name="search">
    </div>
    
    </form>
    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Front Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Initials</th>
            <th>Department</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Employee of _Employees | filterBy: userFilter">
            <td>{{Employee.ID}}</td>
            <td>{{Employee.FNAME}}</td>
            <td>{{Employee.LNAME}}</td>
            <td>{{Employee.TITLE}}</td>
            <td>{{Employee.INITIALS}}</td>
            <td *ngIf="Employee.DEPARTMENT">{{Employee.DEPARTMENT.NAME}}</td>
            <button *ngIf="route == '/employees'" [routerLink]="['/employee',Employee.INITIALS]" type="button" class="btn btn-secondary">Edit</button>
            <button *ngIf="route != '/employees'" (click)="OnClick(Employee)" type="button" class="btn btn-secondary">Add</button>

        </tr>
    </tbody>
    </table>
    <button [routerLink]="['/employeeCreate']" class="btn btn-secondary" >Create new</button>
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
            this._Employees.push(emp);
        }
}