import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from './account.service';
  
@Injectable({
  providedIn: 'root'
})

// export class AuthGardService implements CanActivate{

//   constructor(private jwt: JwtHelperService, private router: Router){ }

//   canActivate(): boolean{
//     const token = localStorage.getItem('jwt_token_val');
//     if(this.jwt.isTokenExpired(token)){
//       this.router.navigate(['Account/Login']);
//       return false;
//     }
//     return true;
//   }
// } // without role 

export class RoleAuthGaurdService implements CanActivate{
  constructor(private router: Router, private account: AccountService){}

  canActivate(route: ActivatedRouteSnapshot): boolean{    
    const jwt = new JwtHelperService();
    // console.log(route);
    const role = route.data['role'];
    // console.log('Expected Role',role);
    // console.log(this.account.getRole());
    this.account.decodeToken();
    const token = this.account.getToken();
    if(jwt.isTokenExpired(token) || this.account.getRole() != role){
      this.account.logout();
      return false;
    }
    return true;
  }
}

