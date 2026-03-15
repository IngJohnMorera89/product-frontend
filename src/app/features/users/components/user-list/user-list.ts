import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../service/user-service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private readonly router = inject(Router);

  private readonly userService = inject(UserService);

  protected readonly users = signal<User[]>([]);

  ngOnInit(): void {
    this.users.set(this.userService.getAll());
  }

  showDetail(username: string) {
    this.router.navigate(['/users', username]);
  }
  removeUser(username: string) {
    this.userService.delete(username);
    this.users.set(this.userService.getAll());
  }
}
