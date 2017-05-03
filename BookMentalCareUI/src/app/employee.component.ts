import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'emp',
    template: `  <div *ngIf="_Employee">
    {{_Employee.FNAME}}
</div> `
})
export class EmployeeComponent{
        _Employee;
        constructor(private employeeService : EmployeeService,private activatedRoute: ActivatedRoute){
            this.activatedRoute.params.map(params => params['initials']).subscribe(initials => {
                this._Employee = this.employeeService.findEmployee(initials);
                console.log(this._Employee);
            })
        }

        
}