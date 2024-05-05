import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-create-first-store',
    templateUrl: './create-first-store.component.html',
    styleUrl: './create-first-store.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFirstStoreComponent {}
