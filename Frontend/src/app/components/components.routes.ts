import { Routes } from '@angular/router';

import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';

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
    component: GameComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
