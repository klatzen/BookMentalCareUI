import {Component} from '@angular/core';
import {EmployeeComponent} from './employee.component';

@Component({
    selector: 'employee',
    template: `

    <input #initials (keyup.enter)="">
    
    `
})
export class EmployeeInputComponent{

    constructor(private employeeComponent: EmployeeComponent){

    }

}