import { Observable } from 'rxjs';

export enum FIGURES {
  X = 'X',
  O = 'O',
}

export interface Player {
  username: string;
  figure: FIGURES;
  avatar: string;
}

export type PlayerObservable = Observable<Player>;

export type GameMode = 'singlePlayer' | 'multiPlayer' | 'localMultiplayer';

export type GameBoardMoves = [
  [first: string, second: string, third: string],
  [first: string, second: string, third: string],
  [first: string, second: string, third: string]
];
