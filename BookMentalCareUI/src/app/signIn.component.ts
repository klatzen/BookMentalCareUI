    import {Component, Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeService} from './services/employee.service';
 
@Component({
    selector: 'sign-in',
    template: ` 
    <h1>Login </h1>
        <div>
        <label for="_Employee.INITIALS"> Initials </label>
        <input value="{{_Employee.INITIALS}}" [(ngModel)]="_Employee.INITIALS" name="INITIALS">
        </div>
        <div class="form-group">
        <label for="_Employee.PASSWORD"> Password </label>
        <input value="{{_Employee.PASSWORD}}" [(ngModel)]="_Employee.PASSWORD" name ="password" type="password">
        <button (click)="signIn()"> Login </button>` 
})
 
export class SignInComponent {
    @Input() _Employee: any = {INITIALS: '',PASSWORD:''};


  constructor(private _cookieService:CookieService, private employeeService: EmployeeService){

  }


  signIn(){
      this.employeeService.signIn(this._Employee.INITIALS,this._Employee.PASSWORD);
      this.employeeService.empEvent.subscribe(data => {console.log(data);
        this._cookieService.put('login',this._Employee);  
    });
  }
}