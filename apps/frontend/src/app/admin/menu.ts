export const menu = [
    {
        name: 'Home',
        title: 'Home',
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        name: 'Setting',
        title: 'Setting',
        path: 'setting',
        loadChildren: () => import('./pages/setting/setting.module').then((m) => m.SettingModule),
    },
];
