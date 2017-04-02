import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class RegisterModule { 
    userName: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
}
