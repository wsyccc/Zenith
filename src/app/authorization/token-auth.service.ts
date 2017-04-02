import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {RegisterModule} from '../register/register.module';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenAuthService {

  private BASE_URL = "http://zenithsocietyserver.azurewebsites.net"; 

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: Http) { }

  Login(username: string, password: string) {
    const url = `${this.BASE_URL}/connect/token`;
    const type = "password";
    var body =  `username=${username}&password=${password}&grant_type=${type}`;   
    return this.http.post(url, body, {headers: this.headers}).map((response: Response) => response.json()).catch(this.handleError);
  }

  Regiser(model: RegisterModule) {
    const url = `${this.BASE_URL}/api/AccountAPI/Register`;
    var body =  `username=${model.userName}&password=${model.password}&firstName=${model.firstName}&lastName=${model.lastName}&email=${model.email}`;
    return this.http.post(url, body, {headers: this.headers}).map((response: Response) => response.json()).catch(this.handleError);
  }

  getUserRoleInfo(access_token: String) {
    const url = `${this.BASE_URL}/api/AccountAPI/RoleInfo`;
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ` + access_token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                      .toPromise()
                      .then(response => response.json())
                      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {    
     return Promise.reject(error.message || error);
  }
}
