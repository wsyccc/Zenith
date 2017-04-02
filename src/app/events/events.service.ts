import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {HomeModule} from '../home/home.module';
import { EventsModule } from '../events/events.module';
import {UserInfoModule} from '../user-info/user-info.module';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  private BASE_URL = "http://zenithsocietyserver.azurewebsites.net"; 
  loginUser : UserInfoModule = new UserInfoModule();
  constructor(private http: Http) { }

  getCurrentWeekEvents(): Promise<HomeModule[]>{
    const url = `${this.BASE_URL}/api/EventsAPI`;
    if(localStorage.getItem("LoginUser")){
      this.loginUser = JSON.parse(localStorage.getItem("LoginUser"));
      let headers = new Headers({'Content-Type' : 'application/json'})
      let token = this.loginUser.token;
      headers.append('Authorization', `Bearer ${token}`);
      let options = new RequestOptions({headers : headers});
      return this.http.get(url, options)
                      .toPromise()
                      .then(response => response.json() as HomeModule[])
                      .catch(this.handleError);
    }
    else {
      return this.http.get(url)
                      .toPromise()
                      .then(response => response.json() as HomeModule[])
                      .catch(this.handleError);
    }
  }

  getLastOrNextWeekEvents(times : number): Promise<HomeModule[]>{
    if(localStorage.getItem("LoginUser")){
      let headers = new Headers({'Content-Type' : 'application/json'})
      let token = this.loginUser.token;
      headers.append('Authorization', `Bearer ${token}`);
      let options = new RequestOptions({ headers: headers });
      const url = `${this.BASE_URL}/api/EventsAPI/PreviousOrNext/${times}`;
      return this.http.get(url, options)
                      .toPromise()
                      .then(response => response.json() as HomeModule[])
                      .catch(this.handleError);
    }
  }
  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
