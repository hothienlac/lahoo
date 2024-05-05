import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-report',
    templateUrl: './report.component.html',
    styleUrl: './report.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {}
