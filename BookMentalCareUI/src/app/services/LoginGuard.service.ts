import {CanActivate,Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private cookieService:CookieService, private router:Router){}
        canActivate(){
            return this.checkIfLoggedIn();
        }

        private checkIfLoggedIn():boolean{
            let employee= this.cookieService.getObject('login');
            if(employee){
                return true;
            }else{
                this.router.navigate(['/signIn']);
                return false;
            }
        }

}