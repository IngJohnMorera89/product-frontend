import { Component, computed, inject, input } from '@angular/core';

import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  private readonly userService = inject(UserService);

  protected readonly username = input<string>();
  protected readonly user = computed(() =>
    this.userService.getByUsername(this.username() ?? 'root'),
  );
}
