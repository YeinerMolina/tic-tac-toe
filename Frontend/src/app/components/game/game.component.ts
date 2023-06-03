import { BehaviorSubject } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { PlayersService } from 'src/app/services/players.service';
import { PlayerObservable } from 'src/app/shared/interfaces';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  openEmergent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.openEmergent.next(true);
  }

  getEmergentObservable() {
    return this.openEmergent.asObservable();
  }

  getPlayer(): PlayerObservable {
    return this.playersService.player;
  }

  getSecondPlayer(): PlayerObservable {
    return this.playersService.secondPlayer;
  }
}
