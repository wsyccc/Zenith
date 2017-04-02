import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class EventsModule { 
  eventId: Number
  startDate: String
  startTime: String
  endTime: String
  isActive: Boolean
  activity: String
}
