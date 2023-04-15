import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  buttons: { label: string; route: string }[] = [
    {
      label: 'New game vs CPU',
      route: '/single-player',
    },
    {
      label: 'Multiplayer',
      route: '/multiplayer',
    },
  ];

  constructor(private readonly router: Router) {}

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
