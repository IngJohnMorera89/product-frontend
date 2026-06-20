import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly error = signal('');

  onSubmit() {
    this.error.set('');
    const ok = this.userService.login(this.username(), this.password());
    if (ok) {
      this.router.navigate(['products']);
    } else {
      this.error.set('Usuario o contraseña incorrectos');
    }
  }

  goToRegister() {
    this.router.navigate(['users', 'new']);
  }
}
