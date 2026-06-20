import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Asegúrate de que estos nombres coincidan con los de CartView
  private cartItemsSignal = signal<CartItem[]>([]);

  // 1. Aquí está el nombre que CartView busca: 'cartItems'
  public readonly cartItems = this.cartItemsSignal.asReadonly();

  // 2. Aquí está el nombre que CartView busca: 'totalCartPrice'
  public readonly totalCartPrice = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  // 3. Asegúrate de tener el método 'clearCart'
  clearCart() {
    this.cartItemsSignal.set([]);
  }
  addToCart(product: any) {
    console.log('¡Llegó al servicio!');
    this.cartItemsSignal.update((items) => {
      // ... lógica ...
      return [...items, { product, quantity: 1 }];
    });
  }
}
