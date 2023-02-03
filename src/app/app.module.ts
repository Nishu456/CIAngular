import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './Layouts/Account/account.component';
import { AccountModule } from './Account/account.module';
import { AdminComponent } from './Layouts/Admin/admin.component';
import { AdminModule } from './Admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Utilities/JwtInterceptor';
import { RichTextEditorComponent, RichTextEditorModule} from '@syncfusion/ej2-angular-richtexteditor';
import { ImageTypeValidator } from './Validations/UploadValidate';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from './material/material.module';
import { EnduserComponent } from './Layouts/Enduser/enduser.component';
import { EnduserModule } from './Enduser/enduser.module';
import { MAT_CHIP, MAT_CHIP_REMOVE } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AdminComponent,
    ImageTypeValidator,
    EnduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    AdminModule,
    MaterialModule,
    RichTextEditorModule,
    BrowserAnimationsModule,
    EnduserModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_CHIP, useValue: []}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
