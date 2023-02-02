import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { RoleAuthGaurdService } from '../Services/auth.service';
import { environment } from './getAPIUrl';

@Injectable()

export class JwtInterceptor implements HttpInterceptor{
    constructor(private auth: RoleAuthGaurdService, private account: AccountService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiurl = req.url.startsWith(environment.apiBaseUrl);
        const token = localStorage.getItem('jwt_token_val');
        if(this.account.isLoggedIn() && apiurl){
            req = req.clone({setHeaders:{
                authorization: `Bearer ${token}`
            }});
        }
        return next.handle(req);
    }
}
