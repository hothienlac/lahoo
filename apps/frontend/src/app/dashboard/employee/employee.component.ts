import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-employee',
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {}
