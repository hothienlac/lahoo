import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoginComponent } from './ngx-login.component';
import { NgxZorroModule } from '@lahoo/ngx-zorro';
import { NgxLoginRoutingModule } from './ngx-login-routing.module';
import { NgxAuthenticationModule } from '@lahoo/ngx-authentication';

@NgModule({
    imports: [CommonModule, NgxZorroModule, NgxLoginRoutingModule, NgxAuthenticationModule],
    declarations: [NgxLoginComponent],
    exports: [NgxLoginComponent],
})
export class NgxLoginModule {}
