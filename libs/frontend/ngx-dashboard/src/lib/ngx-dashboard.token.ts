import { InjectionToken } from '@angular/core';
import { DashboardOptions } from './ngx-dashboard.type';

export const DASHBOARD_OPTIONS_TOKEN = new InjectionToken<DashboardOptions>(
    'DASHBOARD_OPTIONS_TOKEN',
);
