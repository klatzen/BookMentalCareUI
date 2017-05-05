import {Http,RequestOptions, Headers} from '@angular/http';
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
            console.log(this.Employee);
        })
    }

    findEmployees(){
        this.http.get('http://localhost:2026/api/Employee')
        .map(response => response.json())
        .subscribe(data => {data.forEach(employee => this._Employess.push(employee))})

        return this._Employess;
    }

    saveEmployee(tempEmployee){
        this.http.post('http://localhost:2026/api/Employee',tempEmployee).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deleteEmployee(id){
        this.http.delete('http://localhost:2026/api/Employee/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    signIn(initials, password){
        let header = new Headers();

        header.append('Initials', initials);
        header.append('Password', password);

        this.http.get('http://localhost:2026/api/Employee/SignIn', {
      headers: header
    })
        .map(response => response.json())
        .subscribe(data => this.Employee = data,()=> console.log("error"),()=>{
            this.empEvent.emit(this.Employee);
            return this.Employee; 
        })
    }
}