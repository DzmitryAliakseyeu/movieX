import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home-page/home-page').then((module) => module.HomePage),
  },

  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((module) => module.NotFound),
  },
];
