import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DashboardOptions } from './ngx-dashboard.type';
import { DASHBOARD_OPTIONS_TOKEN } from './ngx-dashboard.token';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { NgxAuthenticationService } from '@lahoo/ngx-authentication';
import { API_User } from '@lahoo/api';

@Component({
    selector: 'ngx-dashboard-ngx-dashboard',
    templateUrl: './ngx-dashboard.component.html',
    styleUrl: './ngx-dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDashboardComponent {
    user = this.ngxAuthenticationService.user;
    username = this.user.pipe(
        filter((user): user is API_User => !!user),
        map((user) => user.username),
    );
    avtUsername = this.username.pipe(map((username) => username.charAt(0)));
    avtUrl = this.user.pipe(map((user) => user?.biography.avatar));

    constructor(
        @Inject(DASHBOARD_OPTIONS_TOKEN)
        readonly options: DashboardOptions,
        private readonly ngxAuthenticationService: NgxAuthenticationService,
    ) {}

    logout(): void {
        this.ngxAuthenticationService.logout();
    }
}
