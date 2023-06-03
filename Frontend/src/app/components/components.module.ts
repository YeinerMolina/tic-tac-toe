import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AvatarComponent } from './avatar/avatar.component';
import { ChooseFigureComponent } from './choose-figure/choose-figure.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { FiguresComponent } from './figures/figures.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';

@NgModule({
  declarations: [
    MainComponent,
    MultiplayerComponent,
    GameComponent,
    GameBoardComponent,
    ChooseFigureComponent,
    FiguresComponent,
    AvatarComponent,
  ],
  imports: [CommonModule, ComponentsRoutingModule, SharedModule],
})
export class ComponentsModule {}
