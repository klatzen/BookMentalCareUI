import {Component, Input} from '@angular/core';
import {DepartmentService} from './services/department.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'dep',
    template: ` 
     <div *ngIf="_Department != null">
     <form class="form-inline">
     <div class="form-group">
     
        <div class="col-xs-3"> 
        <label for="_Department.NAME"> Name</label>
        <input class="form-control" value="{{_Department.NAME}}" [(ngModel)]="_Department.NAME" name="name">
        </div>

        <div class="col-xs-3"> 
        <label for="_Department.LOCATION">Location </label>
        <input class="form-control" value="{{_Department.LOCATION}}" [(ngModel)]="_Department.LOCATION" name="location">
        </div>

    </div>
        <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="updateDepartment()" class="btn btn-secondary">Save changes</button>
        <button (click)="deleteDepartment()" class="btn btn-secondary" id="delete-btn">Delete</button>
        </span>
        </div>
    </div>
        </form>
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