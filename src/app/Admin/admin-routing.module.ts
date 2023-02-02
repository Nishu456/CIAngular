import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { MissionComponent } from './mission/mission.component';
import { MissionskillComponent } from './missionskill/missionskill.component';
import { MissionskillviewComponent } from './missionskillview/missionskillview.component';
import { MissionthemeComponent } from './missiontheme/missiontheme.component';
import { MissionthemeviewComponent } from './missionthemeview/missionthemeview.component';
import { MissionviewComponent } from './missionview/missionview.component';
import { UserComponent } from './user/user.component';
import { UserviewComponent } from './userview/userview.component';

export const adminroutes: Routes = [
  {path:'', redirectTo:'User', pathMatch:'full'},
  {path:'User', component:UserviewComponent},  
  {path:'UpsertUser', component:UserComponent},
  {path:'Mission', component:MissionviewComponent},
  {path:'MissionTheme', component:MissionthemeviewComponent},
  {path:'MissionSkill', component:MissionskillviewComponent},
  // {path:'UpsertMission', component:MissionComponent},
  {path:'demo', component:DemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const AdminRouteComponents = [UserComponent, UserviewComponent, MissionComponent, MissionviewComponent,
                          DemoComponent, MissionthemeComponent, MissionthemeviewComponent,  MissionskillComponent,
                          MissionskillviewComponent]
