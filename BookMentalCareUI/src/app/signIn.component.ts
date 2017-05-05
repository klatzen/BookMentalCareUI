import {Component, Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeService} from './services/employee.service';
 
@Component({
    selector: 'my-very-cool-app',
    template: '<button (click)="signIn()">Klik</button>'
})
 
export class SignInComponent {
    @Input() _Employee: any;


  constructor(private _cookieService:CookieService, private employeeService: EmployeeService){

  }


  signIn(){
      this.employeeService.signIn('HNH', '1234');
      this.employeeService.empEvent.subscribe(data => this._Employee = data, () => console.log('Error'), data => {console.log(data);} );
  }
 
  getCookie(key: string){
    return this._cookieService.get(key);
  }
}