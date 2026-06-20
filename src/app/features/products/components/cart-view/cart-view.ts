import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-view.html',
  styleUrls: [],
})
export class CartView {
  private cartService = inject(CartService);

  // Exponemos los datos del carrito para el HTML
  protected cartItems = this.cartService.cartItems;
  protected total = this.cartService.totalCartPrice;

  clearCart() {
    this.cartService.clearCart();
  }

  removeFromCart(productCode: number) {
    // Aquí podrías agregar una función en tu servicio para remover un ítem
    // Por ahora, si quieres avanzar, el botón "Vaciar Carrito" que ya tienes es suficiente.
  }
}
