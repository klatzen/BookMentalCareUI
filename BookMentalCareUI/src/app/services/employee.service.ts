import {Http,RequestOptions, Headers} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';

@Injectable()
export class EmployeeService{
    @Output() _Employess = [];
    @Output() Employee;
    @Output() empEvent = new EventEmitter();

    constructor(private http: Http,private alertService:AlertService, private router:Router){

    }
    

    findEmployee(initials){
        this.http.get('http://localhost:2026/api/Employee/' + initials)
        .map(response => response.json())
        .subscribe(data => this.Employee = data,()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),()=>{
            this.empEvent.emit(this.Employee);  
            
        })
    }

    findEmployees(){
        this._Employess = [];
        this.http.get('http://localhost:2026/api/Employee')
        .map(response => response.json())
        .subscribe(data => {data.forEach(employee => this._Employess.push(employee))},()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"))

        return this._Employess;
    }

    findAvailEmployees(startTime, endTime){
        this._Employess= [];
        this.http.get('http://localhost:2026/api/Employee/GetEmployees/?startTime='+ startTime +"&endTime=" + endTime)
        .map(response => response.json())
        .subscribe(data=> {data.forEach(employee => this._Employess.push(employee))},()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"))

        return this._Employess;
    }

    saveEmployee(tempEmployee){
        this.http.post('http://localhost:2026/api/Employee',tempEmployee).subscribe(()=>"",()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),
        ()=> {this.alertService.showAlert(true,"Data er gemt..","success")
        this.router.navigate(['/employees']);});
    }

    deleteEmployee(id){
        this.http.delete('http://localhost:2026/api/Employee/'+ id).subscribe(()=> "",()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),
        ()=> {this.alertService.showAlert(true,"Data er slettet","success")
                this.router.navigate(['/employees']);});
    }

    signIn(initials, password){
        let header = new Headers();

        header.append('Initials', initials);
        header.append('Password', password);

        this.http.get('http://localhost:2026/api/Employee/SignIn', {
      headers: header
    })
        .map(response => response.json())
        .subscribe(data => this.Employee = data,()=> this.alertService.showAlert(true,"Der opstod en fejl - prøv igen","danger"),()=>{
            this.empEvent.emit(this.Employee);
            return this.Employee; 
        })
        
    }
}