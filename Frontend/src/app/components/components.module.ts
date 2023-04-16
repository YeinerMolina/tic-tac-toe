import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { GameBoardComponent } from './game-board/game-board.component';
import { MainComponent } from './main/main.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SinglePlayerComponent } from './single-player/single-player.component';

@NgModule({
  declarations: [
    MainComponent,
    MultiplayerComponent,
    SinglePlayerComponent,
    GameBoardComponent,
  ],
  imports: [CommonModule, ComponentsRoutingModule, SharedModule],
})
export class ComponentsModule {}
