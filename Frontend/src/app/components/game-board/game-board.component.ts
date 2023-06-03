import { PlayersService } from 'src/app/services/players.service';

import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { FIGURES, GameBoardMoves } from '../../shared/interfaces';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  figures = FIGURES;
  rows: number[] = [0, 1, 2];
  columns: number[] = [0, 1, 2];
  winnerMoves: number[][] = [];
  figureWinner: FIGURES | undefined = undefined;
  gameboardFigures: { [key: string]: FIGURES } = {};
  allMove: GameBoardMoves = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  disabled: boolean = false;
  winner: FIGURES | undefined;

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.actualTurn.subscribe((figure) => {
      this.disabled = figure !== this.playersService.firstPlayerSelectedFigure;
      if (this.disabled && this.gameService.gameMode === 'singlePlayer') {
        this.makeBotMove();
      }
    });
  }

  getId(row: number, column: number) {
    if (this.disabled || this.allMove[row][column]) return;
    this.allMove[row][column] = this.playersService.firstPlayerSelectedFigure;
    this.gameService.checkWinner(this.allMove);
    this.gameService.updateTurn();
  }

  getFigure(row: number, column: number) {
    return this.allMove[row][column] ?? null;
  }

  private makeBotMove() {
    if (this.allMove.every((rows) => rows.every((item) => item !== ''))) return;
    const [row, column] = this.gameService.botMove(this.allMove);
    const winnerOne = this.gameService.checkWinner(this.allMove);
    if (winnerOne.figure) {
      this.disabled = true;
      this.winnerMoves = winnerOne.winnerMoves;
      this.figureWinner = winnerOne.figure;
      return;
    }
    this.allMove[row][column] = this.playersService.secondtPlayerValue.figure;
    const winnerTwo = this.gameService.checkWinner(this.allMove);
    if (winnerTwo.figure) {
      this.winnerMoves = winnerTwo.winnerMoves;
      this.figureWinner = winnerTwo.figure;
      this.disabled = true;
    }
    this.gameService.updateTurn();
  }

  checkWinnerElement(row: number, column: number) {
    return this.winnerMoves.some(
      ([rowMove, columnMove]) => rowMove === row && columnMove === column
    );
  }
}
