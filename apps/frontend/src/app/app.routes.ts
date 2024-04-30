import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./storefront/storefront.module').then((m) => m.StorefrontModule),
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('@lahoo/ngx-dashboard').then((m) => m.NgxDashboardModule),
            },
            {
                path: 'login',
                loadChildren: () => import('@lahoo/ngx-login').then((m) => m.NgxLoginModule),
            },
        ],
    },
];
