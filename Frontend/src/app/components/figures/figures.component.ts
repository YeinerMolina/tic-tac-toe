import { FIGURES } from 'src/app/shared/interfaces';

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.scss'],
})
export class FiguresComponent implements OnChanges {
  @Input() figura: string | null = null;
  @Input() circleWidth: string | null = null;
  @Input() winner: boolean = false;

  showCircle: boolean = false;
  showCruz: boolean = false;

  ngOnChanges(): void {
    if (this.figura === null) return;

    this.showCircle = this.figura === FIGURES.O;
    this.showCruz = this.figura === FIGURES.X;
  }
}
