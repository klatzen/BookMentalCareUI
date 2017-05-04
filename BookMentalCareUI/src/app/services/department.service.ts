import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService{
    @Output() _Departments = [];
    @Output() Department;
    @Output() depEvent = new EventEmitter();

    constructor(private http: Http){

    }

    findDepartment(id){
        this.http.get('http://localhost:2026/api/Department/' + id)
        .map(response => response.json())
        .subscribe(data => this.Department = data,()=> console.log("error"),()=>{
            this.depEvent.emit(this.Department);  
            console.log(this.Department);
        })
    }

    findDepartments(){
        this.http.get('http://localhost:2026/api/Department')
        .map(response => response.json())
        .subscribe(data => {data.forEach(department => this._Departments.push(department))})

        return this._Departments;
    }

    saveDepartment(tempDepartment){
        this.http.post('http://localhost:2026/api/Department', tempDepartment).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deleteDepartment(id){
        this.http.delete('http://localhost:2026/api/Department/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }
}