import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsModule} from '../events/events.module'


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class HomeModule {
    date: Date;
    events: EventsModule[];
 }
