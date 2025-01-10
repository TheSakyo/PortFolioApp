import { Routes } from '@angular/router';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./content/content.page').then(page => page.ContentPage),
    pathMatch: 'full',
  },
];
