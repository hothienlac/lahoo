import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
