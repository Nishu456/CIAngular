import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndUserRouteComponent, EnduserRoutingModule } from './enduser-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgbRating, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    EndUserRouteComponent
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
