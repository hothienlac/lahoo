import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-setting',
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent {}
