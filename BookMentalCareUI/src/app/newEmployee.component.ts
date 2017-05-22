import {Component} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {DepartmentListComponent} from './departmentList.component'; 
import {AlertService} from './services/alert.service';

@Component({
  selector: 'employee',
  inputs:['Department'],
  template: 
  `
  <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3">
        <label for="_Employee.FNAME"> Front Name</label>
        <input class="form-control" [(ngModel)]="_Employee.FNAME" name="first">
        </div>
        
        <div class="col-xs-3">
        <label for="_Employee.LNAME">Last Name </label>
        <input class="form-control" [(ngModel)]="_Employee.LNAME" name="last">
        </div>

        <div class="col-xs-3">
        <label for="_Employee.TITLE"> Title </label>
        <input class="form-control" [(ngModel)]="_Employee.TITLE" name="title">
        </div>
        
        <div class="col-xs-3"> 
        <label for="_Employee.DEPARTMENT.NAME"> Department </label>
        <input class="form-control" [(ngModel)]="_Employee.DEPARTMENT.NAME" name="department" placeholder="choose a department from list" readonly required>
        </div>

        <div class="col-xs-3" id="space-ontop">     
        <label for="_Employee.PASSWORD"> Password </label>
        <input class="form-control" [(ngModel)]="_Employee.PASSWORD" name ="password" type="password">
        </div>
      </div>
  
      <div class="input-group">
        <div class="col-sm-offset-2 col-sm-10">
            <span class="input-group-btn input-space">
            <button (click)="createEmployee()" class="btn btn-secondary" type="submit">Create Employee </button>
            </span>
        </div>
      </div>
      <hr>
      <depList (sendDepartment)="getDepartment($event)"></depList>      
      </form>
  `

})
export class NewEmployeeComponent {
  _Employee:Employee = {FNAME:'',LNAME:'',TITLE:'', PASSWORD:'', DEPARTMENT:''};
        constructor(private employeeService:EmployeeService, private alertService:AlertService){
            
        }

        createEmployee(){
          
          if(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){5,}$/.test(this._Employee.PASSWORD)){
              this.employeeService.saveEmployee(this._Employee);
          }else{
            this.alertService.showAlert(true,"Password skal være minimum 5 tegn langt, indeholde minimum et bogstav og et tal","danger")
          }
          
        }

        getDepartment(event){
          this._Employee.DEPARTMENT = event;
        }

}
interface Employee{
  FNAME,
  LNAME,
  TITLE,
  PASSWORD,
  DEPARTMENT
}
