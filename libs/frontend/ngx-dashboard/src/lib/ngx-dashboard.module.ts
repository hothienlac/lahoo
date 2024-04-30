import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { NgxZorroModule } from '@lahoo/ngx-zorro';
import { NgxDashboardComponent } from './ngx-dashboard.component';
import { DashboardOptions } from './ngx-dashboard.type';
import { DASHBOARD_OPTIONS_TOKEN } from './ngx-dashboard.token';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxZorroModule],
    declarations: [NgxDashboardComponent],
    providers: [
        {
            provide: ROUTES,
            multi: true,
            useFactory: (dashboardOptions: DashboardOptions): Routes => [
                {
                    path: '',
                    component: NgxDashboardComponent,
                    children: [
                        ...dashboardOptions.menu.map((menu) => ({
                            path: menu.path,
                            loadChildren: menu.loadChildren,
                        })),
                        {
                            path: '**',
                            redirectTo: 'home',
                        },
                    ],
                },
            ],
            deps: [DASHBOARD_OPTIONS_TOKEN],
        },
    ],
})
export class NgxDashboardModule {}
