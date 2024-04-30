import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxFirebaseModule } from '@lahoo/ngx-firebase';
import { NgxAuthenticationModule } from '@lahoo/ngx-authentication';
import { appRoutes } from './app.routes';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DASHBOARD_OPTIONS_TOKEN } from '@lahoo/ngx-dashboard';
import { menu } from './menu';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        NgxFirebaseModule,
        NgxAuthenticationModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: DASHBOARD_OPTIONS_TOKEN,
            useValue: {
                applicationName: 'Lahoo',
                menu,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
