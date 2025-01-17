import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage),
    pathMatch: 'full',
  },
];
