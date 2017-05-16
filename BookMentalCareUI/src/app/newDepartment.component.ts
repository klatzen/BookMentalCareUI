import {Component} from '@angular/core';
import {DepartmentService} from './services/department.service';

@Component({
  selector: 'department',
  template: 
  `
  <form class="form-horizontal">
     <div class="form-group">

        <div class="col-xs-3"> 
        <label for="_Department.NAME">Name</label>
        <input  [(ngModel)]="_Department.NAME" name="name">
        </div>
        
        <div class="col-xs-3"> 
        <label for="_Department.LOCATION">Location </label>
        <input  [(ngModel)]="_Department.LOCATION" name="Location">
        </div>
      </div>
      <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="createDepartment()" class="btn btn-secondary">Create Department </button>
        </span>
        </div>
    </div>
        </form>
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
