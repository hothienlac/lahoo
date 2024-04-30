import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-storefront',
    templateUrl: './storefront.component.html',
    styleUrl: './storefront.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorefrontComponent {}
