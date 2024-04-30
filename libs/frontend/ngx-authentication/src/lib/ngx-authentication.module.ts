import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthenticationService } from './ngx-authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenInterceptor } from './access-token.interceptor';
import { AuthenticationErrorInterceptor } from './authentication-error.interceptor';

@NgModule({
    imports: [CommonModule],
    providers: [
        NgxAuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AccessTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationErrorInterceptor,
            multi: true,
        },
    ],
})
export class NgxAuthenticationModule {}
