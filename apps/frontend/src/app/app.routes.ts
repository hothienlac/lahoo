import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
            },
            {
                path: 'business',
                loadChildren: () =>
                    import('./business/business.module').then((m) => m.BusinessModule),
            },
            {
                path: 'login',
                loadChildren: () => import('@lahoo/ngx-login').then((m) => m.NgxLoginModule),
            },
            {
                path: '**',
                loadChildren: () =>
                    import('./storefront/storefront.module').then((m) => m.StorefrontModule),
            },
        ],
    },
];
