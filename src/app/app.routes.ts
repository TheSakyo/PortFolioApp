import { Routes } from '@angular/router';

export const routes: Routes = [

  /***************************************************************/
  /*********************** ⬇️ PRINCIPAL ⬇️ ***********************/
  /***************************************************************/

  {
    path: '',
    loadChildren: () =>
      import('./main/main.route').then((m) => m.MAIN_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.route').then((m) => m.ADMIN_ROUTES),
  },

  /*************************************************************/
  /*********************** ⬇️ ERREUR ⬇️ ***********************/
  /************************************************************/

  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/errors/error-404/error404.component').then(component => component.Error404Component),
    pathMatch: 'full',
  },
];
