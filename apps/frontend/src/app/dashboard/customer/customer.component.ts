import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-customer',
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {}
