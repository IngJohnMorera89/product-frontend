import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { StorageService } from '../../../Shared/service/storageService';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor(private readonly storage: StorageService) {
    this.products = storage.getProducts();
    storage.saveproducts(this.products);
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }
  getProductByCode(code: number): Observable<Product | undefined> {
    return of(this.products.find((p) => p.code === code));
  }

  createProduct(item: Product): Observable<Product> {
    //agregar el producto al final de la lista.

    this.products = [...this.products, item];
    this.saveAll();

    //retornar el producto.
    return of(item);
  }

  updateProduct(code: number, item: Product): Observable<Product | undefined> {
    const product = this.products.find((p) => p.code === code);

    if (product) {
      product.name = item.name;
      product.description = item.description;
      product.price = item.price;
      product.imageUrl = item.imageUrl;
    }
    this.saveAll();
    return of(product);
  }

  deleteProduct(code: number): Observable<void> {
    this.products = this.products.filter((p) => p.code !== code);
    this.saveAll();

    return of(void 0);
  }

  private saveAll(): void {
    this.storage.saveproducts(this.products);
  }
}
