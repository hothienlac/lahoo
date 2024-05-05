import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-site-map',
    templateUrl: './site-map.component.html',
    styleUrl: './site-map.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteMapComponent {}
