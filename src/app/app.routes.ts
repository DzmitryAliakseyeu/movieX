import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { catalogGuard } from './core/guards/catalog-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((module) => module.NotFound),
  },
  // { path: 'person' },
  {
    path: ':mediaType',
    canActivate: [catalogGuard],
    loadComponent: () => import('./features/catalog/catalog').then((module) => module.Catalog),
  },
  { path: '**', redirectTo: '404' },
];
