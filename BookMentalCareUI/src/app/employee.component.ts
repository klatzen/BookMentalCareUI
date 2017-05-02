import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
    selector: 'emp',
    template: `

    <employee>
    <ul>
    <li>Name: {{Employee.ID}}</li>
    <li>Name: {{Employee.FNAME}}</li>
    <li>Name: {{Employee.LNAME}}</li>
    <li>Name: {{Employee.TITLE}}</li>
    <li>Name: {{Employee.INITIALS}}</li>
    </ul>
    </employee>
    
    `
})
export class EmployeeComponent{

    Employee;

        constructor(private employeeService : EmployeeService, initials){
            this.Employee = this.employeeService.findEmployee(initials);
        }
}