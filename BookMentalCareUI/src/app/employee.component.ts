import {Component, Input} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'emp',
    template: ` 
    <h1> Front Name</h1> <div *ngIf="_Employee != null">
    {{_Employee.FNAME}}
</div> `
})
export class EmployeeComponent{
        @Input() _Employee;
        constructor(private employeeService : EmployeeService,private activatedRoute: ActivatedRoute){
            
        }

        ngOnInit(){
            this.activatedRoute.params.map(params => params['initials']).subscribe(initals => {
                this._Employee = this.employeeService.findEmployee(initals);
                
            })

            console.log(this.employeeService.Employee);
        }

        
} 