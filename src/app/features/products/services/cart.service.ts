import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  // Exponemos el estado como solo lectura para seguridad
  public readonly cartItems = this.cartItemsSignal.asReadonly();

  // El total se recalcula automáticamente cada vez que cartItemsSignal cambia
  public readonly totalCartPrice = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  addToCart(product: Product) {
    this.cartItemsSignal.update((items) => {
      // Buscamos si el producto ya está en el carrito
      const existingItem = items.find((item) => item.product.code === product.code);

      if (existingItem) {
        // Si ya existe, incrementamos la cantidad
        return items.map((item) =>
          item.product.code === product.code ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      // Si no existe, lo agregamos como nuevo
      return [...items, { product, quantity: 1 }];
    });

    console.log('Producto agregado. Nuevo total:', this.totalCartPrice());
  }

  removeFromCart(productCode: number) {
    this.cartItemsSignal.update((items) =>
      items.filter((item) => item.product.code !== productCode),
    );
  }

  clearCart() {
    this.cartItemsSignal.set([]);
  }
  // En tu cart.service.ts
  checkout() {
    const total = this.totalCartPrice();
    // Aquí podrías conectar con una API real de pagos
    console.log('Procesando pago por:', total);

    // Limpiamos el carrito
    this.clearCart();

    // Retornamos el total para que el componente sepa cuánto se cobró
    return total;
  }
}
