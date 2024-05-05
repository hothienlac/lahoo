import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';

const routes: Routes = [
    {
        path: '',
        component: BusinessComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('@lahoo/ngx-dashboard').then((m) => m.NgxDashboardModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BusinessRoutingModule {}
