import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lahoo-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {}
