import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/shared/header/header';
import { UserService } from './features/users/service/user-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly userService = inject(UserService);
  protected readonly currentUser = computed(() => this.userService.getCurrentUser());
}
