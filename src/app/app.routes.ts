import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },

  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((module) => module.NotFound),
  },
];
