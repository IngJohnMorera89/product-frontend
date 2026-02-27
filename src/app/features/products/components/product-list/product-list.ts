import { Component, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected readonly products = signal<Product[]>([
    {
      code: 100001.0001,
      name: 'Computador',
      price: 2600000,
      imageUrl:
        'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/abdf9b43-4a57-4e18-8627-9552e135d925.9f75fcaf168c32a34b27dd87d1b0e422.png',
    },
    {
      code: 200001.321,
      name: 'Mouse',
      price: 150000,
    },
    {
      code: 300001.666666666,
      name: 'Monitor',
      price: 750000,
    },
  ]);

  onSearch() {
    this.products.set([]);
  }
}
