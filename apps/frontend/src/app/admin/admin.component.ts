import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-admin',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
    constructor() {
        console.log('AdminComponent');
    }
}
