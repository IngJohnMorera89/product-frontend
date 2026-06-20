import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../users/service/user-service';
import { CartService } from '../../products/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  protected readonly currentUser = computed(() => this.userService.getCurrentUser());

  protected cartService = inject(CartService);
  // Esto nos dará el total en tiempo real
  protected totalCompra = this.cartService.totalCartPrice;

  protected logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
