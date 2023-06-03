import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { FIGURES, GameBoardMoves, GameMode } from '../shared/interfaces';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameMode: GameMode = 'singlePlayer';

  constructor(private readonly playerService: PlayersService) {}

  private turn: BehaviorSubject<FIGURES> = new BehaviorSubject<FIGURES>(
    FIGURES.X
  );

  get actualTurn() {
    return this.turn.asObservable();
  }

  startGame() {
    this.turn.next(FIGURES.X);
  }

  updateTurn() {
    this.turn.next(this.turn.value === FIGURES.X ? FIGURES.O : FIGURES.X);
  }

  botMove(allMoves: GameBoardMoves) {
    const {
      movimientosNecesarios: movimientosNecesariosRow,
      posiblesMovimientos: posiblesMovimientosRow,
    } = this.checkRowsAndColumns(allMoves, false);

    const {
      movimientosNecesarios: movimientosNecesariosCol,
      posiblesMovimientos: posiblesMovimientosCol,
    } = this.checkRowsAndColumns(allMoves, true);

    const {
      movimientosNecesarios: movimientosNecesariosDiag,
      posiblesMovimientos: posiblesMovimientosDiag,
    } = this.checkDiagonals(allMoves);

    const movimientosNecesarios: number[][] = [
      ...movimientosNecesariosRow,
      ...movimientosNecesariosCol,
      ...movimientosNecesariosDiag,
    ];

    const posiblesMovimientos: number[][] = [
      ...posiblesMovimientosRow,
      ...posiblesMovimientosCol,
      ...posiblesMovimientosDiag,
    ];

    if (movimientosNecesarios.length) return movimientosNecesarios[0];

    return this.getRadomMove(posiblesMovimientos);
  }

  private getRadomMove(movimientos: number[][]) {
    return movimientos[Math.round(Math.random() * (movimientos.length - 1))];
  }

  private checkRowsAndColumns(
    allMoves: GameBoardMoves,
    cols: boolean
  ): {
    movimientosNecesarios: number[][];
    posiblesMovimientos: number[][];
  } {
    const movimientosNecesarios: number[][] = [];
    const posiblesMovimientos: number[][] = [];
    for (let rowIndex = 0; rowIndex < allMoves.length; rowIndex++) {
      const row = allMoves[rowIndex];
      let otherPlayerRowMove: number = 0;
      let botMoves: number = 0;
      let emptyRows: number[] = [];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const item = cols
          ? allMoves[colIndex][rowIndex]
          : allMoves[rowIndex][colIndex];
        const { otherPlayer, bot, empty } = this.checkPlayerMoves(
          item,
          otherPlayerRowMove,
          botMoves,
          emptyRows,
          colIndex
        );

        otherPlayerRowMove = otherPlayer;
        botMoves = bot;
        emptyRows = empty;
      }

      const move = cols ? [emptyRows[0], rowIndex] : [rowIndex, emptyRows[0]];
      if ((otherPlayerRowMove === 2 || botMoves === 2) && emptyRows.length) {
        if (botMoves === 2) {
          movimientosNecesarios.unshift(move);
          console.log(movimientosNecesarios);
        } else movimientosNecesarios.push(move);

        continue;
      }

      if (emptyRows.length) {
        posiblesMovimientos.push(move);
      }
    }
    return { movimientosNecesarios, posiblesMovimientos };
  }

  private checkPlayerMoves(
    move: string,
    otherPlayerRowMove: number,
    botMoves: number,
    emptyRows: number[],
    colIndex: number
  ) {
    if (move === this.playerService.firstPlayerSelectedFigure) {
      otherPlayerRowMove += 1;
    } else if (move === this.playerService.secondtPlayerValue.figure) {
      botMoves += 1;
    } else if (!move.length) {
      emptyRows.push(colIndex);
    }

    return {
      otherPlayer: otherPlayerRowMove,
      bot: botMoves,
      empty: emptyRows,
    };
  }

  private checkDiagonals(allMoves: GameBoardMoves) {
    const movimientosNecesarios: number[][] = [];
    const posiblesMovimientos: number[][] = [];
    const emptys: { one: number[]; two: number[] } = { one: [], two: [] };
    const otherPlayerRowMove: { one: number; two: number } = {
      one: 0,
      two: 0,
    };

    const botMoves: { one: number; two: number } = {
      one: 0,
      two: 0,
    };

    for (let index = 0; index < 3; index++) {
      const itemOne = allMoves[index][index];
      const itemTwo = allMoves[2 - index][index];

      if (itemOne === this.playerService.firstPlayerSelectedFigure) {
        otherPlayerRowMove.one += 1;
      } else if (itemOne === this.playerService.secondtPlayerValue.figure) {
        botMoves.one += 1;
      } else {
        emptys.one.push(index);
      }
      if (itemTwo === this.playerService.firstPlayerSelectedFigure) {
        otherPlayerRowMove.two += 1;
      } else if (itemTwo === this.playerService.secondtPlayerValue.figure) {
        botMoves.two += 1;
      } else {
        emptys.two.push(2 - index);
      }

      if (
        (otherPlayerRowMove.one === 2 || botMoves.one === 2) &&
        emptys.one.length
      ) {
        movimientosNecesarios.push([emptys.one[0], emptys.one[0]]);
      } else if (emptys.one.length) {
        posiblesMovimientos.push([emptys.one[0], emptys.one[0]]);
      }

      if (
        (otherPlayerRowMove.two === 2 || botMoves.one === 2) &&
        emptys.two.length
      ) {
        movimientosNecesarios.push([emptys.two[0], emptys.two[0]]);
      } else if (emptys.two.length) {
        posiblesMovimientos.push([emptys.two[0], emptys.two[0]]);
      }
    }
    return { movimientosNecesarios, posiblesMovimientos };
  }

  checkWinner(allMoves: GameBoardMoves): {
    figure: FIGURES | undefined;
    winnerMoves: number[][];
  } {
    let winnerMoves: number[][] = [];
    let figure = undefined;
    const diagonalOne: string[] = [];
    const diagonalTwo: string[] = [];
    for (let index = 0; index < allMoves.length; index++) {
      const element = allMoves[index];
      const rowWinner = new Set(element);
      diagonalOne.push(allMoves[index][index]);
      diagonalTwo.push(allMoves[2 - index][index]);
      const colWinner = new Set([
        allMoves[0][index],
        allMoves[1][index],
        allMoves[2][index],
      ]);

      if (rowWinner.size === 1 && !rowWinner.has('')) {
        const [first] = rowWinner;
        figure = first as FIGURES;
        winnerMoves = [
          [index, 0],
          [index, 1],
          [index, 2],
        ];
        break;
      }
      if (colWinner.size === 1 && !colWinner.has('')) {
        const [first] = colWinner;
        figure = first as FIGURES;
        winnerMoves = [
          [0, index],
          [1, index],
          [2, index],
        ];
        break;
      }
    }

    if (figure) {
      return {
        winnerMoves,
        figure,
      };
    }

    const setDiagonalOne = new Set(diagonalOne);
    const setDiagonalTwo = new Set(diagonalTwo);

    if (setDiagonalOne.size === 1 && !setDiagonalOne.has('')) {
      const [first] = setDiagonalOne;
      figure = first as FIGURES;
      for (let index = 0; index < 3; index++) {
        winnerMoves.push([index, index]);
      }
    }

    if (setDiagonalTwo.size === 1 && !setDiagonalTwo.has('')) {
      const [first] = setDiagonalTwo;
      figure = first as FIGURES;
      for (let index = 0; index < 3; index++) {
        winnerMoves.push([2 - index, index]);
      }
    }

    return {
      winnerMoves,
      figure,
    };
  }
}
