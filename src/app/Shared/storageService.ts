import { Injectable } from '@angular/core';
import { Product } from '../features/products/models/product';
import { User } from '../features/users/models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = localStorage;
  saveproducts(products: Product[]) {
    const key = 'products';
    const value = JSON.stringify(products);
    this.storage.setItem(key, value);
  }

  getProducts(): Product[] {
    const key = 'products';
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value) as Product[];
    }
    return [];
  }

  saveUsers(users: User[]) {
    const key = 'users';
    const value = JSON.stringify(users);
    this.storage.setItem(key, value);
  }

  getUsers(): User[] {
    const key = 'users';
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value) as User[];
    }
    return [];
  }
}
