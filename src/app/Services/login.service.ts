import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilogin } from '../Interfaces/ICI';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://localhost:7206/api/Account/login";

  constructor(private http: HttpClient) { }

  login(data: Ilogin){
    return this.http.post(this.url, data, {responseType: 'text'}).pipe(
      map(res => res),
      catchError(error => throwError(error))
    )
  }
}
