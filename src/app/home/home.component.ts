import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service'
import {HomeModule} from './home.module'
import {UserInfoModule} from '../user-info/user-info.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginUser : UserInfoModule = new UserInfoModule();
  eventsOnHome : HomeModule[];
  hasRole : Boolean = false;
  times : number = 0;
  constructor(private events : EventsService) { }

  ngOnInit() {
    this.getCurrentWeekEvents();
    if(localStorage.getItem("LoginUser")){
      this.loginUser = JSON.parse(localStorage.getItem("LoginUser"));
      if(this.loginUser.role != null){
        this.hasRole = true;
      }    
    }
  }
  
  getCurrentWeekEvents(){
    this.events.getCurrentWeekEvents().then(
      data => {
        this.eventsOnHome = data;
        this.reformatDate();
      }); 
  }

  getLastWeekEvents(){
    this.times -= 1;
    this.events.getLastOrNextWeekEvents(this.times).then(
      data => {
        this.eventsOnHome = data;
        this.reformatDate();
      });
  }

  getNextWeekEvents(){
    this.times += 1;
    this.events.getLastOrNextWeekEvents(this.times).then(
      data => {
        this.eventsOnHome = data;
        this.reformatDate();
      });
  }

  reformatDate(){
    this.eventsOnHome.forEach(element => {
      element.events.forEach(element => {
        element.startDate = element.startDate.substr(0, 10);
      });
    });
  }
}
