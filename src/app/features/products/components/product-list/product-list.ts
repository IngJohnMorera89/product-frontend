import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { WindowsService } from '../../../../shared/services/windows';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  protected readonly windowService = inject(WindowsService);
  private readonly productService = inject(ProductService);

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

  onEdit(product: Product) {
    this.windowService.setActualWindow('detail');
  }
}
