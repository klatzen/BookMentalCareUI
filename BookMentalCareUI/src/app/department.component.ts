import {Component, Input} from '@angular/core';
import {DepartmentService} from './services/department.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'dep',
    template: ` 
     <div *ngIf="_Department != null">
     <form>
     <div class="form-group">
        <label for="_Department.NAME"> Name</label>
        <input value="{{_Department.NAME}}" [(ngModel)]="_Department.NAME" name="name">
    </div>
    <div class="form-group">
    <label for="_Department.LOCATION">Location </label>
        <input value="{{_Department.LOCATION}}" [(ngModel)]="_Department.LOCATION" name="location">
        </div>
        
        </form>
        <button (click)="updateDepartment()">Update </button>
        <button (click)="deleteDepartment()">Delete</button>
    </div>
     `
})
export class DepartmentComponent{
        @Input() _Department: any;
        constructor(private departmentService : DepartmentService,private activatedRoute: ActivatedRoute){
            
        }
        ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.departmentService.findDepartment(id);
            this.departmentService.depEvent.subscribe(data => this._Department = data,() => console.log("ERROR"),()=> console.log(this._Department));
                
            })
        }

        deleteDepartment(){
            this.departmentService.deleteDepartment(this._Department.ID);
        }
        updateDepartment(){
            this.departmentService.saveDepartment(this._Department);
        }

        
} 