import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/ProductService';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink],
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
      return this.allProducts().filter((p) =>
        p.name.toLowerCase().includes(this.searchText().toLowerCase()),
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

  onSearch(searchValue: string) {
    this.searchText.set(searchValue);
  }

  onView(product: Product) {
    this.router.navigate(['products', product.code]);
  }
}
