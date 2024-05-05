import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DASHBOARD_OPTIONS_TOKEN } from '@lahoo/ngx-dashboard';
import { menu } from './menu';
import { CreateFirstStoreComponent } from './create-first-store/create-first-store.component';

@NgModule({
    imports: [CommonModule, BusinessRoutingModule],
    declarations: [BusinessComponent, CreateFirstStoreComponent],
    providers: [
        {
            provide: DASHBOARD_OPTIONS_TOKEN,
            useValue: {
                applicationName: 'Lahoo Business',
                menu,
            },
        },
    ],
})
export class BusinessModule {}
