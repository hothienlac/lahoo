import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-store',
    templateUrl: './store.component.html',
    styleUrl: './store.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {}
