import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UserInfoModule {
  userName : string;
  isLogin : Boolean;
  role: string;
  token : string;
 }
