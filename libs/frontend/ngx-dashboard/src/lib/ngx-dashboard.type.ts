import { LoadChildrenCallback } from '@angular/router';

export type MenuItem = {
    name: string;
    title: string;
    path: string;
    loadChildren: LoadChildrenCallback;
};

export type Menu = MenuItem[];

export type DashboardOptions = {
    applicationName: string;
    menu: Menu;
};
