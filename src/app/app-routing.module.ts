import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accountroutes } from './Account/account-routing.module';
import { AccountComponent } from './Layouts/Account/account.component';
import { AdminComponent } from './Layouts/Admin/admin.component';
import { adminroutes } from './Admin/admin-routing.module';
import { RoleAuthGaurdService } from './Services/auth.service';
import { enduserroutes } from './Enduser/enduser-routing.module';
import { EnduserComponent } from './Layouts/Enduser/enduser.component';

const routes: Routes = [
  {path: '', redirectTo:'Account', pathMatch:'full'},
  {path: 'Account', component:AccountComponent, data: {title: 'Account'}, children:accountroutes},
  {path: 'AdminPage', component:AdminComponent, data: {title: 'Admin', role: 'Admin'}, children:adminroutes, 
  canActivate: [RoleAuthGaurdService]},
  {path: 'EndUserPage', component:EnduserComponent, data: {title: 'Enduser', role: 'User'}, children:enduserroutes, 
  canActivate: [RoleAuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
