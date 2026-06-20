import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from '../../../Shared/service/storageService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly users = signal<User[]>([]);
  private readonly currentUser = signal<User | null>(null);

  constructor(private readonly storage: StorageService) {
    this.users.set(this.storage.getUsers());
    const fromStorage = localStorage.getItem('currentUser');
    if (fromStorage) {
      this.currentUser.set(JSON.parse(fromStorage));
    }
  }

  getAll(): User[] {
    return this.users();
  }

  getByUsername(username: string) {
    return this.users().find((u) => u.username === username);
  }

  create(user: User) {
    this.users.update((uu) => [...uu, user]);
    this.saveAll();
    return user;
  }

  delete(username: string): void {
    this.users.update((uu) => uu.filter((u) => u.username !== username));
    this.saveAll();
  }

  login(username: string, password: string): boolean {
    const user = this.getByUsername(username);
    if (user && user.password === password) {
      this.currentUser.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const current = this.currentUser();
    if (current) {
      return current;
    }

    const fromStorage = localStorage.getItem('currentUser');
    if (fromStorage) {
      const saved = JSON.parse(fromStorage) as User;
      this.currentUser.set(saved);
      return saved;
    }

    return null;
  }

  private saveAll() {
    this.storage.saveUsers(this.users());
  }
}
