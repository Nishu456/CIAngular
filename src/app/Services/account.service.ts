import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { IforgetPassword, Ilogin, Iregister } from '../Interfaces/ICI';
import { environment } from '../Utilities/getAPIUrl';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiBaseurl = environment.apiBaseUrl;
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken();
  }

  login(data: Ilogin){
    return this.http.post(`${this.apiBaseurl}Account/login`, data, {responseType: 'text'}).pipe(
      map(res => res),
      catchError(error => throwError(error))
    )
  }

  register(data: Iregister){
    return this.http.post(`${this.apiBaseurl}Account/register`, data).pipe(
      map(res => res), catchError(error => throwError(error)));
  }

  forgetPassword(data: IforgetPassword){
    return this.http.post(`${this.apiBaseurl}Account/forgetPassword`, data, {responseType: 'text'}).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['Account/Login']);
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

  getToken(){ 
    return localStorage.getItem('jwt_token_val');
  }

  setToken(token: string){
    localStorage.setItem('jwt_token_val', token);
  }

  decodeToken(){
    const JwtHelper = new JwtHelperService();
    const token = this.getToken();
    this.userPayload=JwtHelper.decodeToken(token!)
  }

  getRole(){   
    if(this.userPayload)
      return this.userPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getEmail(){
    if(this.userPayload)
      return this.userPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  getUserName(){
    if(this.userPayload)
      return this.userPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }
}
