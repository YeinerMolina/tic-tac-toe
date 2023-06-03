import { Subject } from 'rxjs';

import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  buttons: { label: string; route: string }[] = [
    {
      label: 'Single Player',
      route: '/single-player',
    },
    {
      label: 'Multiplayer',
      route: '/multiplayer',
    },
    {
      label: 'Local Multiplayer',
      route: '/local-multiplayer',
    },
  ];
  user: string = '';
  username: Subject<string> = new Subject<string>();
  validName: boolean = false;
}
