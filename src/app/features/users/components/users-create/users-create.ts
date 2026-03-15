import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { UserService } from '../../service/user-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-create',
  imports: [ReactiveFormsModule],
  templateUrl: './users-create.html',
  styleUrl: './users-create.css',
})
export class UsersCreate {
  protected readonly userService = inject(UserService);
  protected readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  protected userForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.min(20)]],
    email: ['', [Validators.required]],
    active: [true, [Validators.required]],
  });

  onSubmit() {
    this.userService.create(this.userForm.value as User);
    alert('Se ha guardado el usuario con éxito');
    this.backTolist();
  }

  backTolist() {
    this.router.navigateByUrl('/users');
  }
}
