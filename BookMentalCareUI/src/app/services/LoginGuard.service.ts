import {CanActivate,Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class LoginGuard implements CanActivate {
    route:any;
    signIn:boolean = true;
    constructor(private cookieService:CookieService, private router:Router){
        this.route = window.location.pathname;
        
    }
        canActivate(){
            return this.checkIfLoggedIn();
        }

        private checkIfLoggedIn():boolean{
            let employee= this.cookieService.getObject('login');
            if(employee){
                if(employee && this.route == '/signIn' && this.signIn){
                    this.signIn = false;
                    this.router.navigate(['/bookings']);
                }
                return true;
            }else{
                 if(window.location.pathname == '/signIn'){
                     return true;
                 }
                this.router.navigate(['/signIn']);
               
                return false;
            }
        }

}