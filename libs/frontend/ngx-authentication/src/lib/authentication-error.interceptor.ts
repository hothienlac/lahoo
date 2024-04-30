import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NgxAuthenticationService } from './ngx-authentication.service';

@Injectable()
export class AuthenticationErrorInterceptor implements HttpInterceptor {
    constructor(private readonly ngxAuthenticationService: NgxAuthenticationService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !request.url.includes('api/authentication/login')) {
                    this.ngxAuthenticationService.logout();
                    return throwError(() => error);
                }
                return throwError(() => error);
            }),
        );
    }
}
