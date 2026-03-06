import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly users = signal<User[]>([
    {
      username: 'cdiaz',
      password: 'cdiaz123',
      name: 'Cesar Diaz',
      email: 'cdiaz@email.com',
      active: true,
    },
    {
      username: 'jromero',
      password: 'iromero123',
      name: 'Jonathan Romero',
      email: 'jromero@email.com',
      active: true,
    },
  ]);

  getAll(): User[] {
    return this.users();
  }

  getByUsername(username: string) {
    return this.users().find((u) => u.username === username);
  }
}
