import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-appointment',
    templateUrl: './appointment.component.html',
    styleUrl: './appointment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {}
