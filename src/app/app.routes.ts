import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home-page/home-page').then((module) => module.HomePage),
  },

  {
    path: 'people',
    loadComponent: () =>
      import('./features/people-page/people-page').then((module) => module.PeoplePage),
  },

  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((module) => module.NotFound),
  },
];
