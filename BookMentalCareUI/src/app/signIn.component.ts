    import {Component, Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeService} from './services/employee.service';
 
@Component({
    selector: 'my-very-cool-app',
    template: ` 
    <h1>Login </h1>
        <div>
        <label for="_Employee.INITIALS">Initials </label>
        <input value="{{_Employee.INITIALS}}" [(ngModel)]="_Employee.INITIALS" name="initials">
        </div>
        <div class="form-group">
        <label for="_Employee.PASSWORD"> Password </label>
        <input value="{{_Employee.PASSWORD}}" [(ngModel)]="_Employee.PASSWORD" name ="password">
    <button (click)="signIn()">login</button>
    <button (click)="signOff()">log off</button>` 
})
 
export class SignInComponent {
    @Input() _Employee: any;


  constructor(private _cookieService:CookieService, private employeeService: EmployeeService){

  }


  signIn(){
      this._Employee = this.employeeService.signIn('HNH', '1234');
      this.employeeService.empEvent.subscribe(data =>{ 
          this._Employee = data;
          console.log(this._Employee);
          this._cookieService.putObject('login',this._Employee);
        },()=> console.log("ERROR"),()=> console.log("Done"));
  }
  signOff(){
      this._cookieService.remove('login');
  }
}