import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from '../../../Shared/service/storageService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly users = signal<User[]>([]);

  constructor(private readonly storage: StorageService) {
    this.users.set(this.storage.getUsers());
  }

  getAll(): User[] {
    return this.users();
  }

  getByUsername(username: string) {
    return this.users().find((u) => u.username === username);
  }

  create(user: User) {
    this.users.update((uu) => [...uu, user]);
    return user;
  }

  delete(username: string): void {
    this.users.update((uu) => uu.filter((u) => u.username !== username));
    this.saveAll();
  }

  private saveAll() {
    this.storage.saveUsers(this.users());
  }
}
