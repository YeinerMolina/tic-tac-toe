import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [MainComponent, MultiplayerComponent, SinglePlayerComponent, GameBoardComponent],
  imports: [CommonModule, ComponentsRoutingModule],
})
export class ComponentsModule {}
