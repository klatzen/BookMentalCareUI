import {Component} from '@angular/core';
import {DepartmentService} from './services/department.service';

@Component({
  selector: 'department',
  template: 
  `
  <form>
     <div class="form-group">
        <label for="_Department.NAME">Name</label>
        <input  [(ngModel)]="_Department.NAME" name="name">
    </div>
    <div class="form-group">
    <label for="_Department.LOCATION">Location </label>
        <input  [(ngModel)]="_Department.LOCATION" name="Location">
        </div>
        
        </form>
        <button (click)="createDepartment()">Create Department </button>
  `

})
export class NewDepartmentComponent {
  _Department:Department = {NAME:'', LOCATION:''};
        constructor(private departmentService:DepartmentService){
            
        }

        createDepartment(){
          this.departmentService.saveDepartment(this._Department);
        }
}
interface Department{
  NAME,
  LOCATION
}
