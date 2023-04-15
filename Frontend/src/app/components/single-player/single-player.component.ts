import { Component } from '@angular/core';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss'],
})
export class SinglePlayerComponent {
  selectedFigure: string = 'X';
  players: { name: string; figure: string }[] = [
    {
      name: 'P4nc170',
      figure: 'O',
    },
    {
      name: 'P4nc170_2',
      figure: 'X',
    },
  ];

  changeSelectedFigure(figure: string) {
    this.selectedFigure = figure;
  }
}
