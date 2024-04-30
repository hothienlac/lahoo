// eslint-disable-next-line @nx/enforce-module-boundaries
import { Menu } from '@lahoo/ngx-dashboard';

export const menu: Menu = [
    {
        name: 'Home',
        title: 'Home',
        path: 'dashboard/home',
        loadChildren: () => import('./dashboard/home/home.module').then((m) => m.HomeModule),
    },
    {
        name: 'Store',
        title: 'Store',
        path: 'dashboard/store',
        loadChildren: () => import('./dashboard/store/store.module').then((m) => m.StoreModule),
    },
    {
        name: 'Facility',
        title: 'Facility',
        path: 'dashboard/facility',
        loadChildren: () =>
            import('./dashboard/facility/facility.module').then((m) => m.FacilityModule),
    },
    {
        name: 'Employee',
        title: 'Employee',
        path: 'dashboard/employee',
        loadChildren: () =>
            import('./dashboard/employee/employee.module').then((m) => m.EmployeeModule),
    },
    {
        name: 'Customer',
        title: 'Customer',
        path: 'dashboard/customer',
        loadChildren: () =>
            import('./dashboard/customer/customer.module').then((m) => m.CustomerModule),
    },
    {
        name: 'Appointment',
        title: 'Appointment',
        path: 'dashboard/appointment',
        loadChildren: () =>
            import('./dashboard/appointment/appointment.module').then((m) => m.AppointmentModule),
    },
    {
        name: 'Promotion',
        title: 'Promotion',
        path: 'dashboard/promotion',
        loadChildren: () =>
            import('./dashboard/promotion/promotion.module').then((m) => m.PromotionModule),
    },
    {
        name: 'Report',
        title: 'Report',
        path: 'dashboard/report',
        loadChildren: () => import('./dashboard/report/report.module').then((m) => m.ReportModule),
    },
    {
        name: 'Setting',
        title: 'Setting',
        path: 'dashboard/setting',
        loadChildren: () => import('./dashboard/setting/setting.module').then((m) => m.SettingModule),
    },
];
