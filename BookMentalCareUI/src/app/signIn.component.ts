    import {Component, Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {EmployeeService} from './services/employee.service';
 
@Component({
    selector: 'sign-in',
    template: ` 
        <form class=form-vertical>
        <div class=form-group>
        <div class="col-xs-3"> 
            <label for="_Employee.INITIALS"> Initials </label>
            <input class="form-control" value="{{_Employee.INITIALS}}" [(ngModel)]="_Employee.INITIALS" name="INITIALS">
        </div>

        <div class="col-xs-3"> 
        <label for="_Employee.PASSWORD"> Password </label>
        <input class="form-control" value="{{_Employee.PASSWORD}}" [(ngModel)]="_Employee.PASSWORD" name ="password" type="password">
        </div>

        <div class="input-group">
            <div class="col-sm-offset-2 col-sm-10">
                <span class="input-group-btn input-space">
                <button (click)="signIn()" [routerLink]="['/']" class="btn btn-secondary" >Login</button>
                </span>
            </div>
        </div>
        </div>
        </form>
        ` 
        
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