import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/ProductService';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  protected readonly loading = signal(true);
  protected readonly searchText = signal('');
  private readonly allProducts = signal<Product[]>([]);

  // Filtro de productos basado en el buscador
  protected readonly products = computed(() => {
    const term = this.searchText().toLowerCase();
    if (!term) return this.allProducts();

    return this.allProducts().filter(
      (p) => p.name.toLowerCase().includes(term) || p.code.toString().includes(term),
    );
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.loading.set(false);
        this.allProducts.set(data);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error al listar los productos', error);
      },
    });
  }

  // Método unificado para agregar al carrito
  protected addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`¡${product.name} agregado al carrito!`);
  }

  onView(product: Product) {
    this.router.navigate(['products', product.code]);
  }

  onDelete(code: number) {
    if (confirm(`¿Está seguro de eliminar el producto con código ${code}?`)) {
      this.productService.deleteProduct(code).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error al eliminar', err),
      });
    }
  }
}
