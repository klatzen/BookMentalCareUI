import {Component, Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

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
                <button type="button" (click)="signIn()" class="btn btn-secondary" >Login</button>
                </span>
            </div>
        </div>
        </div>
        </form>
        ` 
        
})
 
export class SignInComponent {
    @Input() _Employee: any = {ID:0,INITIALS: '',PASSWORD:''};
    signedin: any;

  constructor(private _cookieService:CookieService, private employeeService: EmployeeService,private router:Router){

  }


  signIn(){
      this.employeeService.signIn(this._Employee.INITIALS,this._Employee.PASSWORD);
      this.employeeService.empEvent.subscribe(data => {
          this.signedin = data;
          if(this.signedin != null){
                this._cookieService.putObject('login',this.signedin);
                window.location.reload();
                this.router.navigate(['/bookings']);
          }
    });

  }
}