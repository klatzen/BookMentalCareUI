import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertService} from '../services/alert.service';

@Injectable()
export class DepartmentService{
    @Output() _Departments = [];
    @Output() Department;
    @Output() depEvent = new EventEmitter();

    constructor(private http: Http, private alertService:AlertService){

    }

    findDepartment(id){
        this.http.get('http://localhost:2026/api/Department/' + id)
        .map(response => response.json())
        .subscribe(data => this.Department = data,()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),()=>{
            this.depEvent.emit(this.Department);  
        })
    }

    findDepartments(){
        this.http.get('http://localhost:2026/api/Department')
        .map(response => response.json())
        .subscribe(data => {data.forEach(department => this._Departments.push(department))},()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"))

        return this._Departments;
    }

    saveDepartment(tempDepartment){
        this.http.post('http://localhost:2026/api/Department', tempDepartment).subscribe(()=>"",()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),
        ()=> this.alertService.showAlert(true,"Data er gemt..","success"));
    }

    deleteDepartment(id){
        this.http.delete('http://localhost:2026/api/Department/'+ id).subscribe(()=>"",()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),
        ()=> this.alertService.showAlert(true,"Data er slettet","success"));
    }
}