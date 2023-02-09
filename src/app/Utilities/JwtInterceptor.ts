import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { RoleAuthGaurdService } from '../Services/auth.service';
import { environment } from './getAPIUrl';

@Injectable()

export class JwtInterceptor implements HttpInterceptor{
    constructor(private auth: RoleAuthGaurdService, private account: AccountService,
                private router: Router, private route: ActivatedRoute){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiurl = req.url.startsWith(environment.apiBaseUrl);
        const token = localStorage.getItem('jwt_token_val');
        if(this.account.isLoggedIn() && apiurl){
            req = req.clone({setHeaders:{
                authorization: `Bearer ${token}`
            }});
        }
        //return next.handle(req);

        return next.handle(req).pipe(
            catchError((error: any)=>{
                if(error instanceof HttpErrorResponse){
                    if(error.status === 400 || error.status === 0){
                        this.router.navigate(['../error'],{relativeTo: this.route})
                      }
                }
                return throwError(()=>error);
                }
            )
        )
    }
}
