import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnduserRoutingModule } from './enduser-routing.module';
import { MaterialModule } from '../material/material.module';
import { FetchmissionsComponent } from './fetchmissions/fetchmissions.component';


@NgModule({
  declarations: [
    FetchmissionsComponent
  ],
  imports: [
    CommonModule,
    EnduserRoutingModule,
    MaterialModule
  ]
})
export class EnduserModule { }
