import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  currentMenu = "User";
  loginusername = "";
  currentdatetime: Date;

  constructor(private logoutservice: AccountService, private router: Router){
    this.loginusername = this.logoutservice.getFullName();
    this.currentdatetime = new Date()
    this.currentMenu = router.url.split("/")[2];
  }
  
  Logout(){
    this.logoutservice.logout();
  }
}
