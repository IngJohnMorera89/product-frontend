import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
