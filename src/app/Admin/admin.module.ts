import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouteComponents, AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AdminRouteComponents
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularEditorModule
  ]
})
export class AdminModule { }
