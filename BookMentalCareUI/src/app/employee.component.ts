import {Component, Input} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'emp',
    template: ` 
     <div *ngIf="_Employee != null">
     <form>
     <div class="form-group">
        <label for="_Employee.FNAME"> Front Name</label>
        <input value="{{_Employee.FNAME}}" [(ngModel)]="_Employee.FNAME" name="first">
    </div>
    <div class="form-group">
    <label for="_Employee.LNAME">Last Name </label>
        <input value="{{_Employee.LNAME}}" [(ngModel)]="_Employee.LNAME" name="last">
        </div>
        <div class="form-group">
        <label for="_Employee.TITLE"> Title </label>
        <input value="{{_Employee.TITLE}}" [(ngModel)]="_Employee.TITLE" name="title">
        
        </div>
        <div class="form-group">
        <label for="_Employee.INITIALS"> Initials </label>
        <input value="{{_Employee.INITIALS}}" [(ngModel)]="_Employee.INITIALS" name ="initials">
        
        </div>
        </form>
        <button (click)="updateEmployee()">Update </button>
        <button (click)="deleteEmployee()">Delete</button>
    </div>
     `
})
export class EmployeeComponent{
        @Input() _Employee: any;
        constructor(private employeeService : EmployeeService,private activatedRoute: ActivatedRoute){
            
        }
        ngOnInit(){
            this.activatedRoute.params.map(params => params['initials']).subscribe(initals => {
            this.employeeService.findEmployee(initals);
            this.employeeService.empEvent.subscribe(data => this._Employee = data,() => console.log("ERROR"),()=> console.log(this._Employee));
                
            })
        }

        deleteEmployee(){
            this.employeeService.deleteEmployee(this._Employee.ID);
        }
        updateEmployee(){
            this.employeeService.saveEmployee(this._Employee);
        }

        
} 