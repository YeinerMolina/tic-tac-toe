import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  buttons: { label: string; route: string }[] = [
    {
      label: 'Multiplayer',
      route: '/multiplayer',
    },
    {
      label: 'Single Player',
      route: '/single-player',
    },
  ];

  constructor(private readonly router: Router) {}

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
