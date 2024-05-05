import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-explore',
    templateUrl: './explore.component.html',
    styleUrl: './explore.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent {}
