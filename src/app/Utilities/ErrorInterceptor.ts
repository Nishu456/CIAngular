import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private _injector: Injector, private router: Router,
        private route: ActivatedRoute){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: any)=>{
                if(error instanceof HttpErrorResponse){
                    if(error.status === 400){
                        this.router.navigate(['../error'],{relativeTo: this.route})
                      }
                }
                return throwError(()=>error);
                }
            )
        )
    }
}