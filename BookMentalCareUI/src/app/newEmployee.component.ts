import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {DepartmentListComponent} from './departmentList.component'; 

@Component({
  selector: 'employee',
  inputs:['Department'],
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
        <label for="_Employee.DEPARTMENT"> Department </label>
        <input [(ngModel)]="_Employee.DEPARTMENT" name="department">
        </div>

        <div class="form-group">
        <label for="_Employee.INITIALS"> Initials </label>
        <input  [(ngModel)]="_Employee.INITIALS" name ="initials">
        </div>

        <div class="form-group">
        <label for="_Employee.PASSWORD"> Password </label>
        <input  [(ngModel)]="_Employee.PASSWORD" name ="password" type="password">
        </div>

        <depList (sendDepartment)="getDepartment($event)"></depList>        

        </form>
        <button (click)="createEmployee()">Create Employee </button>
  `

})
export class NewEmployeeComponent {
  _Employee:Employee = {FNAME:'',LNAME:'',TITLE:'',INITIALS:'', PASSWORD:'', DEPARTMENT:''};
        constructor(private employeeService:EmployeeService){
            
        }

        createEmployee(){
          this.employeeService.saveEmployee(this._Employee);
        }

        getDepartment(event){
          console.log(event);
        }

}
interface Employee{
  FNAME,
  LNAME,
  TITLE,
  INITIALS,
  PASSWORD,
  DEPARTMENT
}
