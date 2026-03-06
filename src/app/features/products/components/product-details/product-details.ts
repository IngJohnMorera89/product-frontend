import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly producService = inject(ProductService);
  private readonly router = inject(Router);

  protected readonly code = input<string>();
  private readonly codeNumber = computed(() => Number.parseInt(this.code() ?? '0'));

  protected readonly product = signal<Product | undefined>(undefined);

  ngOnInit(): void {
    this.product.set(this.producService.getProductByCode(this.codeNumber()));
  }

  onBack() {
    this.router.navigateByUrl('/products');
  }
}
