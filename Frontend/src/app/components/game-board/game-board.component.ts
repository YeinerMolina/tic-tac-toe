import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  rows: number[] = [1, 2, 3];
  columns: number[] = [1, 2, 3];

  getId(row: number, column: number) {
    console.log({ row, column });
  }
}
