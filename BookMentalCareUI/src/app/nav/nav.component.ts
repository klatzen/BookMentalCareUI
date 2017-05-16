import { Component, OnInit, Output } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {AlertService, AlertMessage} from '../services/alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  login: any;
  objAlert: AlertMessage;

  constructor(private cookieService: CookieService, private alertService:AlertService) { }

  ngOnInit() {
      this.login = this.cookieService.get("login");
      this.alertService.status.subscribe((val: AlertMessage) => {
        this.objAlert = {show: val.show, message: val.message, alertType: val.alertType}
      });
  }

  onCloseAlert(reason: string){
    this.alertService.showAlert(false, null, null);
  }

  signOut(){
    this.cookieService.remove("login");
  }

}
