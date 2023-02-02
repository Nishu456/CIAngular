import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouteComponents, AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AdminRouteComponents,    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RichTextEditorModule,
    MaterialModule
  ]
})
export class AdminModule { }
