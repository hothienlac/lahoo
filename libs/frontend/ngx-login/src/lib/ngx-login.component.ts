import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxAuthenticationService } from '@lahoo/ngx-authentication';

@Component({
    selector: 'ngx-login-ngx-login',
    templateUrl: './ngx-login.component.html',
    styleUrl: './ngx-login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {
    constructor(private readonly ngxAuthenticationService: NgxAuthenticationService) {}

    ngOnInit(): void {
        this.ngxAuthenticationService.isLoggedIn.subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                location.href = '/';
            }
        });
    }

    googleSignIn(): void {
        this.ngxAuthenticationService.loginGoogle().then(() => {
            location.href = '/';
        });
    }
}
