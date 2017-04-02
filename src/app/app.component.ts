import { Component, NgModule } from '@angular/core';
import {Response} from "@angular/http";
import {TokenAuthService} from './authorization/token-auth.service';
import {UserInfoModule} from './user-info/user-info.module'
import {EventsService} from './events/events.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TokenAuthService, EventsService]
})
export class AppComponent {
  title = 'Zenith Society';
  userInfo: UserInfoModule = new UserInfoModule();
  login : Boolean;
  constructor(private token: TokenAuthService, private events: EventsService) {}

  ngOnInit() {
    if (localStorage.getItem("LoginUser")) {
      this.userInfo = JSON.parse(localStorage.getItem("LoginUser"));
      this.login = true;
    } else {
      this.login = false;
      this.userInfo.userName = "";
    }
  } 

  logoff() {
    localStorage.clear();
    this.login = false;
    this.userInfo.userName = "";
  }
}



