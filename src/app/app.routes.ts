import { Routes } from '@angular/router';

export const routes: Routes = [

  /*************************************************************/
  /*********************** ⬇️ PRINCIPAL ⬇️ ***********************/
  /*************************************************************/
  
  {
    path: '', 
    loadComponent: () => import('./content/content.page').then(page => page.ContentPage), 
    pathMatch: 'full',
  },

  /**********************************************************/
  /*********************** ⬇️ ERREUR ⬇️ ***********************/
  /**********************************************************/
  
  {
    path: '**',  
    loadComponent: () => import('./components/errors/error-404/error404.component').then(component => component.Error404Component), 
    pathMatch: 'full',
  }
];
