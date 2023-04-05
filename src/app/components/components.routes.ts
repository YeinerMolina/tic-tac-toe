import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const componentsRoutes: Routes = [
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
