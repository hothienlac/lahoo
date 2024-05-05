import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityRoutingModule } from './facility-routing.module';
import { FacilityComponent } from './facility.component';

@NgModule({
    imports: [CommonModule, FacilityRoutingModule],
    declarations: [FacilityComponent],
})
export class FacilityModule {}
