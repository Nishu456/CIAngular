import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndUserRouteComponent, EnduserRoutingModule } from './enduser-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgbRating, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { VolunteertimeComponent } from './volunteertime/volunteertime.component';
import { VolunteergoalComponent } from './volunteergoal/volunteergoal.component';


@NgModule({
  declarations: [
    EndUserRouteComponent,
    VolunteertimeComponent,
    VolunteergoalComponent
  ],
  imports: [
    CommonModule,
    EnduserRoutingModule,
    MaterialModule,
    NgbRating,
    NgbCarousel
  ]
})
export class EnduserModule { }
