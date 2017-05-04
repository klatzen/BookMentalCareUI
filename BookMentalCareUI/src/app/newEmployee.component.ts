import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
  selector: 'employee',
  template: 
  `
  <form>
     <div class="form-group">
        <label for="_Employee.FNAME"> Front Name</label>
        <input  [(ngModel)]="_Employee.FNAME" name="first">
    </div>
    <div class="form-group">
    <label for="_Employee.LNAME">Last Name </label>
        <input  [(ngModel)]="_Employee.LNAME" name="last">
        </div>
        <div class="form-group">
        <label for="_Employee.TITLE"> Title </label>
        <input [(ngModel)]="_Employee.TITLE" name="title">
        
        </div>
        <div class="form-group">
        <label for="_Employee.INITIALS"> Initials </label>
        <input  [(ngModel)]="_Employee.INITIALS" name ="initials">
        
        </div>
        </form>
        <button (click)="createEmployee()">Create Employee </button>
  `

})
export class NewEmployeeComponent {
  _Employee:Employee = {FNAME:'',LNAME:'',TITLE:'',INITIALS:''};
        constructor(private employeeService:EmployeeService){
            
        }

        createEmployee(){
          this.employeeService.saveEmployee(this._Employee);
        }
}
interface Employee{
  FNAME,
  LNAME,
  TITLE,
  INITIALS
}
