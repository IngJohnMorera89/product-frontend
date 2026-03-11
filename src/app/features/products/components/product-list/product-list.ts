import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/ProductService';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  protected readonly searchText = signal('');

  private readonly allProducts = signal<Product[]>([]);
  protected readonly products = computed(() => {
    if (this.searchText() === '') {
      return this.allProducts();
    } else {
      return this.allProducts().filter(
        (p) =>
          p.name.toLowerCase().includes(this.searchText().toLowerCase()) ||
          p.code.toString().includes(this.searchText()) ||
          p.code.toString().includes(this.searchText()),
      );
    }
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    const list = this.productService.getAllProducts();
    this.allProducts.set(list);
  }

  onView(product: Product) {
    this.router.navigate(['products', product.code]);
  }

  onDelete(code: number) {
    //Verificar si está seguro em eliminar
    if (confirm(`Está Seguro en Eliminar este Producto ${code}?`)) {
      this.productService.deleteProduct(code);
      this.loadProducts();
    }
  }
}
