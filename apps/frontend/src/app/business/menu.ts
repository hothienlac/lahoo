export const menu = [
    {
        name: 'Home',
        title: 'Home',
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        name: 'Store',
        title: 'Store',
        path: 'store',
        loadChildren: () => import('./pages/store/store.module').then((m) => m.StoreModule),
    },
    {
        name: 'Facility',
        title: 'Facility',
        path: 'facility',
        loadChildren: () =>
            import('./pages/facility/facility.module').then((m) => m.FacilityModule),
    },
    {
        name: 'Employee',
        title: 'Employee',
        path: 'employee',
        loadChildren: () =>
            import('./pages/employee/employee.module').then((m) => m.EmployeeModule),
    },
    {
        name: 'Customer',
        title: 'Customer',
        path: 'customer',
        loadChildren: () =>
            import('./pages/customer/customer.module').then((m) => m.CustomerModule),
    },
    {
        name: 'Appointment',
        title: 'Appointment',
        path: 'appointment',
        loadChildren: () =>
            import('./pages/appointment/appointment.module').then((m) => m.AppointmentModule),
    },
    {
        name: 'Promotion',
        title: 'Promotion',
        path: 'promotion',
        loadChildren: () =>
            import('./pages/promotion/promotion.module').then((m) => m.PromotionModule),
    },
    {
        name: 'Report',
        title: 'Report',
        path: 'report',
        loadChildren: () => import('./pages/report/report.module').then((m) => m.ReportModule),
    },
    {
        name: 'Setting',
        title: 'Setting',
        path: 'setting',
        loadChildren: () => import('./pages/setting/setting.module').then((m) => m.SettingModule),
    },
];
