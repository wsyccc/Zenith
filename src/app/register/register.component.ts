import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {TokenAuthService} from '../authorization/token-auth.service';
import {UserInfoModule} from '../user-info/user-info.module';
import {RegisterModule} from './register.module';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterModule = new RegisterModule();
  error = false;
  loading = false;
  message : string;
  errorMessage : string[] = []
  constructor(private token: TokenAuthService, private router: Router) { }

  ngOnInit() {
  }

  register(model: RegisterModule){
    this.loading = true;
        this.token.Regiser(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.message = 'Registration successful';
                    this.error = false;
                    this.router.navigate(['/home']);
                },
                error => {
                    
                    this.loading = false;
                    console.log(error);
                     JSON.parse(error._body).errors.forEach(element => {
                       var item : string = element.description.toString();
                       this.errorMessage.push(item);                     
                    });        
                    this.error = true;
                });
  }

}
