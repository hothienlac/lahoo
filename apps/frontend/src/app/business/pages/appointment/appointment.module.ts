import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';

@NgModule({
    imports: [CommonModule, AppointmentRoutingModule],
    declarations: [AppointmentComponent],
})
export class AppointmentModule {}
