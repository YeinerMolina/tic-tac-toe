import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SinglePlayerComponent } from './single-player/single-player.component';

export const componentsRoutes: Routes = [
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'multiplayer',
    component: MultiplayerComponent,
  },
  {
    path: 'single-player',
    component: SinglePlayerComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
