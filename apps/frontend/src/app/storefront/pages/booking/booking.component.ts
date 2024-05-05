import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-booking',
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {}
