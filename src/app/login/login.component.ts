import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {TokenAuthService} from '../authorization/token-auth.service';
import {LoginModule} from "./login.module";
import {UserInfoModule} from "../user-info/user-info.module";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginModule;
  error: Boolean;
  errorMessage : String = "";
  loading : Boolean = false;
  loginUser : UserInfoModule = new UserInfoModule(); 
  constructor(private router: Router, 
              private token: TokenAuthService) {
    this.user = new LoginModule(); 
   }

  ngOnInit() {
  }

  login(model: LoginModule){
    this.loading = true;
    this.token.Login(model.userName, model.password).subscribe(
      data => {
        //var loginUser = new UserInfoModule();
        this.loginUser.userName = model.userName;
        this.loginUser.token = data.access_token;
        this.loginUser.isLogin = true;

        this.token.getUserRoleInfo(data.access_token).then((data : any) => {
            this.loginUser.role = data.role;
            localStorage.setItem("LoginUser", JSON.stringify(this.loginUser));
            window.location.reload();
            this.router.navigate(['./home']);
          });
      },
      error => {
        this.loginUser.isLogin = false;
        this.error = true;
        this.loading = false;
        this.errorMessage = JSON.parse(error._body).error_description;
      }
    )
  }

}
