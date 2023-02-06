import { Component } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-enduser',
  templateUrl: './enduser.component.html',
  styleUrls: ['./enduser.component.css']
})
export class EnduserComponent {

  loginusername = "";

  constructor(private logoutservice: AccountService){
    this.loginusername = this.logoutservice.getUserName();
  }
  
  Logout(){
    this.logoutservice.logout();
  }
}
