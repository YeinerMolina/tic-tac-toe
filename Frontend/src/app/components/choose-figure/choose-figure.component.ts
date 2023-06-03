import { Observable, Subject, takeUntil } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { FIGURES } from 'src/app/shared/interfaces';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-choose-figure',
  templateUrl: './choose-figure.component.html',
  styleUrls: ['./choose-figure.component.scss'],
  animations: ['./choose-figure.animations.ts'],
})
export class ChooseFigureComponent implements OnInit, OnDestroy {
  @Input('open') open$!: Observable<boolean>;

  FIGURES = FIGURES;
  selectedFigure: FIGURES = FIGURES.X;

  playerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(1)]],
  });

  _open: boolean = false;
  destroy$: Subject<void> = new Subject();
  selectedAvatar!: string;
  avatarCounter: number = 1;

  constructor(
    private readonly playerService: PlayersService,
    private readonly gameService: GameService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedAvatar = `assets/${this.avatarCounter}.jpg`;
    this.open$
      .pipe(takeUntil(this.destroy$))
      .subscribe((open) => (this._open = open));
    this.playerForm.get('username')?.valueChanges.subscribe((username) => {
      if (this.playerForm.invalid) return;
      this.playerService.changeUserName(username);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  changeSelectedFigure() {
    this.selectedFigure = this.getOtherFigure(this.selectedFigure);
    const secondPlayer = { ...this.playerService.secondtPlayerValue };
    secondPlayer.figure = this.getOtherFigure(this.selectedFigure);
    this.playerService.updateSecondPlayer(secondPlayer);
    this.playerService.changeFigure(this.selectedFigure);
  }

  getOtherFigure(figure: FIGURES) {
    return figure === FIGURES.X ? FIGURES.O : FIGURES.X;
  }

  nextAvatar() {
    const next = this.avatarCounter + 1;
    if (next > 35) {
      this.avatarCounter = 1;
      this.changeSelectedAvatar();
      return;
    }

    this.avatarCounter = next;
    this.changeSelectedAvatar();
  }

  prevAvatar(): void {
    const prev = this.avatarCounter - 1;
    if (prev < 1) {
      this.avatarCounter = 35;
      this.changeSelectedAvatar();
      return;
    }

    this.avatarCounter = prev;
    this.changeSelectedAvatar();
  }

  private changeSelectedAvatar() {
    const url = `assets/${this.avatarCounter}.jpg`;
    this.selectedAvatar = url;
    this.playerService.changeAvatar(url);
  }

  invalidPlayer(): boolean {
    return (
      (this.playerForm.get('username')?.touched &&
        this.playerForm.get('username')?.invalid) ??
      false
    );
  }

  validateAndClose() {
    if (this.playerForm.invalid) return this.playerForm.markAllAsTouched();
    this.gameService.startGame();
    this._open = false;
  }
}
