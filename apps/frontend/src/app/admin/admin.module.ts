import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DASHBOARD_OPTIONS_TOKEN } from '@lahoo/ngx-dashboard';
import { menu } from './menu';

@NgModule({
    imports: [CommonModule, AdminRoutingModule],
    declarations: [AdminComponent],
    providers: [
        {
            provide: DASHBOARD_OPTIONS_TOKEN,
            useValue: {
                applicationName: 'LAHOO ADMIN',
                menu,
            },
        },
    ],
})
export class AdminModule {}
