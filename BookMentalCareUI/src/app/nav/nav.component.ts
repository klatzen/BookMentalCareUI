import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  login: any;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
      this.login = this.cookieService.get("login");
  }

  signOut(){
    this.cookieService.remove("login");
  }

}
