import { Route, RouterModule } from '@angular/router';
import { NgxLoginComponent } from './ngx-login.component';
import { NgModule } from '@angular/core';

export const routes: Route[] = [
    {
        path: '',
        component: NgxLoginComponent,
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxLoginRoutingModule {}
