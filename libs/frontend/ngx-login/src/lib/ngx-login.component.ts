import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxAuthenticationService } from '@lahoo/ngx-authentication';

@Component({
    selector: 'ngx-login-ngx-login',
    templateUrl: './ngx-login.component.html',
    styleUrl: './ngx-login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {
    constructor(
        private readonly ngxAuthenticationService: NgxAuthenticationService,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.ngxAuthenticationService.isLoggedIn.subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.loginSuccess();
            }
        });
    }

    googleSignIn(): void {
        this.ngxAuthenticationService.loginGoogle().then(() => {
            this.loginSuccess();
        });
    }

    loginSuccess(): void {
        this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {
            const redirect = queryParamMap.get('redirect');
            if (!redirect) {
                window.location.href = '/';
            } else {
                const redirectUrl = atob(redirect);
                window.location.href = redirectUrl;
            }
        });
    }
}
