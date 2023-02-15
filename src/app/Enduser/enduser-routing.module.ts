import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchmissionsComponent } from './fetchmissions/fetchmissions.component';
import { VolunteermissionComponent } from './volunteermission/volunteermission.component';
import { VolunteertimesheetComponent } from './volunteertimesheet/volunteertimesheet.component';

export const enduserroutes: Routes = [
  {path:'', redirectTo:'missionrecords',pathMatch:'full'},
  {path:'missionrecords', component:FetchmissionsComponent},
  {path:'volunteermission', component:VolunteermissionComponent},
  {path:'timesheet', component:VolunteertimesheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(enduserroutes)],
  exports: [RouterModule]
})
export class EnduserRoutingModule { }

export const EndUserRouteComponent = [FetchmissionsComponent, VolunteermissionComponent, VolunteertimesheetComponent];