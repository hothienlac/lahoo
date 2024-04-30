import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorefrontRoutingModule } from './storefront-routing.module';
import { StorefrontComponent } from './storefront.component';

@NgModule({
    imports: [CommonModule, StorefrontRoutingModule],
    declarations: [StorefrontComponent],
})
export class StorefrontModule {}
