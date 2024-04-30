import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { NgxAuthenticationService } from './ngx-authentication.service';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor(private readonly ngxAuthenticationService: NgxAuthenticationService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (
            !request.url.startsWith('/api') ||
            request.url.includes('/api/system-authentication/login') ||
            request.url.includes('useAccessToken=false')
        ) {
            return next.handle(request);
        }
        return this.ngxAuthenticationService.accessToken.pipe(
            switchMap((accessToken) => {
                if (!accessToken) {
                    return next.handle(request);
                }
                return next.handle(
                    request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }),
                );
            }),
        );
    }
}
