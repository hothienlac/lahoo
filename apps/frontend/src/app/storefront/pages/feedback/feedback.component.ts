import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-feedback',
    templateUrl: './feedback.component.html',
    styleUrl: './feedback.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {}
