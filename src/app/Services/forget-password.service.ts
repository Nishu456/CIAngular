import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IforgetPassword } from '../Interfaces/ICI';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  url = "https://localhost:7206/api/Account/forgetPassword";

  constructor(private http: HttpClient) { }

  forgetPassword(data: IforgetPassword){
    return this.http.post(this.url, data, {responseType: 'text'}).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }
}
