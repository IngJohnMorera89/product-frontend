import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    this.products = [
      {
        code: 100001,
        name: 'Computador',
        price: 2600000,
        imageUrl:
          'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/abdf9b43-4a57-4e18-8627-9552e135d925.9f75fcaf168c32a34b27dd87d1b0e422.png',
      },
      {
        code: 200001,
        name: 'Mouse',
        price: 150000,
      },
      {
        code: 300001,
        name: 'Monitor',
        price: 750000,
      },
    ];
  }

  getAllProducts(): Product[] {
    return this.products;
  }
  getProductByCode(code: number): Product | undefined {
    return this.products.find((p) => p.code === code);
  }

  createProduct(item: Product): Product {
    this.products = [...this.products, item];

    return item;
  }

  deleteProduct(code: number): void {
    this.products = this.products.filter((p) => p.code !== code);
  }
}
