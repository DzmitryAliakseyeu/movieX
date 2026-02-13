import { Routes } from '@angular/router';
import { catalogGuard } from './core/guards/catalog-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home-page/home-page').then((module) => module.HomePage),
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((module) => module.NotFound),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((module) => module.About),
  },
  // { path: 'person' },
  {
    path: ':mediaType',
    canActivate: [catalogGuard],
    loadComponent: () => import('./features/catalog/catalog').then((module) => module.Catalog),
  },
  { path: '**', redirectTo: '404' },
];
