import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-users-create',
  imports: [ReactiveFormsModule],
  templateUrl: './users-create.html',
  styleUrl: './users-create.css',
})
export class UsersCreate {
  private readonly fb = inject(FormBuilder);
  protected userForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.min(20)]],
    email: ['', [Validators.required]],
  });

  onSubmit() {
    alert(JSON.stringify(this.userForm.value));
  }
}
