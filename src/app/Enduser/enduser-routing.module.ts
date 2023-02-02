import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchmissionsComponent } from './fetchmissions/fetchmissions.component';

export const enduserroutes: Routes = [
  {path:'', redirectTo:'missionrecords',pathMatch:'full'},
  {path:'missionrecords', component:FetchmissionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(enduserroutes)],
  exports: [RouterModule]
})
export class EnduserRoutingModule { }

export const EndUserRouteComponent = [];