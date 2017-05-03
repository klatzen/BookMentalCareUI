import {Http} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService{
    @Output() _Employess = [];
    @Output() Employee;
    @Output() empEvent = new EventEmitter();

    constructor(private http: Http){

    }

    findEmployee(initials){
        this.http.get('http://localhost:2026/api/Employee/' + initials)
        .map(response => response.json())
        .subscribe(data => this.Employee = data,()=> console.log("error"),()=>{
            this.empEvent.emit(this.Employee);  
        })
    }

    findEmployees(){
        this.http.get('http://localhost:2026/api/Employee')
        .map(response => response.json())
        .subscribe(data => {data.forEach(employee => this._Employess.push(employee))})

        return this._Employess;
    }

    saveEmployee(){

    }

    deleteEmployee(){

    }
}