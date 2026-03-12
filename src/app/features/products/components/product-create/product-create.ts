import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  private readonly fb = inject(FormBuilder);
  protected productForm = this.fb.group({
    code: [0, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(500)]],
    description: '',
    imageUrl: ['', [Validators.required]],
  });

  onSubmit() {
    alert(JSON.stringify(this.productForm.value));
  }
}
