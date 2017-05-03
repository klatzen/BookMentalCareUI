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
        {{_Employee.FNAME}}
    </div>
    <div class="form-group">
    <label for="_Employee.LNAME">Last Name </label>
        {{_Employee.LNAME}}
        </div>
        <div class="form-group">
        <label for="_Employee.TITLE"> Title </label>
        {{_Employee.TITLE}}
        </div>
        </form>
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
            this.employeeService.empEvent.subscribe(data => this._Employee = data);
                
            })
        }

        
} 