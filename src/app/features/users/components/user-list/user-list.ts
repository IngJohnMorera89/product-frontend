import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../service/user-service';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);

  protected readonly users = signal<User[]>([]);

  ngOnInit(): void {
    this.users.set(this.userService.getAll());
  }
}
