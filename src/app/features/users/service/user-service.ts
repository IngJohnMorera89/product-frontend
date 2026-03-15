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
    {
      username: 'jmorera',
      password: 'jm1234',
      name: 'John Morera',
      email: 'johnmorera@email.com',
      active: true,
    },
    {
      username: 'smorera',
      password: 'smorera123',
      name: 'Sara Morera',
      email: 'saramorera@email.com',
      active: true,
    },
    {
      username: 'mhernandez',
      password: 'mhernandez123',
      name: 'Marcela Hernandez',
      email: 'marcelahernandez@email.com',
      active: true,
    },
    {
      username: 'ybarrera',
      password: 'ybarrera123',
      name: 'Yolanda Barrera',
      email: 'yolandabarrera@email.com',
      active: true,
    },
    {
      username: 'fbarrera',
      password: 'fbarrera123',
      name: 'Freddy Barrera',
      email: 'fredyBarrera@email.com',
      active: true,
    },
    {
      username: 'ymorera',
      password: 'ymorera123',
      name: 'Yessica Morera',
      email: 'yessicamorera@email.com',
      active: true,
    },

    {
      username: 'gmorera',
      password: 'gmorera123',
      name: 'German Morera',
      email: 'germanmorera@email.com',
      active: true,
    },
  ]);

  getAll(): User[] {
    return this.users();
  }

  getByUsername(username: string) {
    return this.users().find((u) => u.username === username);
  }

  delete(username: string): void {
    this.users.update((uu) => uu.filter((u) => u.username !== username));
  }
}
