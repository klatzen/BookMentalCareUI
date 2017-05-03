import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';
@Component({
    selector: 'emp',
    template: ''
})
export class EmployeeComponent{

        constructor(private employeeService : EmployeeService){
            
        }

        
}