import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../Layouts/Account/account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const accountroutes: Routes = [
  {path:'', redirectTo:'Login', pathMatch:'full'},
  {path:'Login', component:LoginComponent},
  {path:'Register', component:RegisterComponent},
  {path:'ResetPassword', component:ResetPasswordComponent},
  {path:'ForgetPassword', component:ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(accountroutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

export const AccountRoutingComponents = [RegisterComponent, LoginComponent, 
  ForgetPasswordComponent, ResetPasswordComponent]