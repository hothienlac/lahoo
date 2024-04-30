import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-promotion',
    templateUrl: './promotion.component.html',
    styleUrl: './promotion.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionComponent {}
