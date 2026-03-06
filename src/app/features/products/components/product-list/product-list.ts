import { Component, inject, OnInit, signal } from '@angular/core';
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

  ngOnInit(): void {
    this.loadProducts();
  }
  protected readonly products = signal<Product[]>([]);

  private loadProducts() {
    const list = this.productService.getAllProducts();
    this.products.set(list);
  }

  onSearch() {
    this.products.set([]);
  }

  onView(product: Product) {
    this.router.navigate(['products', product.code]);
  }
}
