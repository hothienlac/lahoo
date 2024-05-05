import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent {}
