import { BehaviorSubject, combineLatest, debounceTime } from 'rxjs';

import { Injectable } from '@angular/core';

import { FIGURES, Player, PlayerObservable } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private _username = new BehaviorSubject<string>('');
  private _selectedFigure = new BehaviorSubject<FIGURES>(FIGURES.X);
  private _selectAvatar = new BehaviorSubject<string>('assets/1.jpg');
  private _secondPlayer = new BehaviorSubject<Player>({
    username: 'bot',
    figure: FIGURES.O,
    avatar: `assets/${Math.round(Math.random() * 35)}.jpg`,
  });

  get firstPlayerSelectedFigure(): FIGURES {
    return this._selectedFigure.value;
  }

  get secondPlayer(): PlayerObservable {
    return this._secondPlayer.asObservable();
  }

  get secondtPlayerValue(): Player {
    return this._secondPlayer.value;
  }

  get player(): PlayerObservable {
    const username = this._username.asObservable().pipe(debounceTime(300));
    const figure = this._selectedFigure.asObservable().pipe(debounceTime(300));
    const avatar = this._selectAvatar.asObservable().pipe(debounceTime(300));
    return combineLatest({ username, figure, avatar });
  }

  updateSecondPlayer(player: Player) {
    this._secondPlayer.next(player);
  }

  changeUserName(username: string) {
    this._username.next(username);
  }

  changeFigure(figure: FIGURES) {
    this._selectedFigure.next(figure);
  }

  changeAvatar(avatar: string) {
    this._selectAvatar.next(avatar);
  }
}
