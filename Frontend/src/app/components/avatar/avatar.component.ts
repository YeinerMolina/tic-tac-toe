import { FIGURES, PlayerObservable } from 'src/app/shared/interfaces';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input('player') player$!: PlayerObservable;
  username: string = '';
  figure: FIGURES | null = null;
  avatar: string = '';
  ngOnInit() {
    this.player$.subscribe((item) => {
      this.username = item.username;
      this.figure = item.figure;
      this.avatar = item.avatar;
    });
  }
}
