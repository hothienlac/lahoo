import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
