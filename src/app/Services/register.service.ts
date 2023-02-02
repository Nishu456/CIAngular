import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iregister } from '../Interfaces/ICI';
import { throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = "https://localhost:7206/api/Account/register";

  constructor(private http: HttpClient) { }

  register(data: Iregister){
      return this.http.post(this.url, data).pipe(
        map(res => res), catchError(error => throwError(error)));
  }
}
