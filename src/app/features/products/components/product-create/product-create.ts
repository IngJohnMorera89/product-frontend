import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);

  protected readonly code = input();
  protected readonly title = computed(() => (this.code() ? 'Editar' : 'Nuevo'));

  protected productForm = this.fb.group({
    code: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(100)]],
    description: null as string | null,
    imageUrl: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: [0, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(100)]],
      description: null as string | null,
      imageUrl: ['', [Validators.required]],
    });
  }

  onSubmit() {
    alert(JSON.stringify(this.productForm.value));
    this.productService.createProduct(this.productForm.value as Product);
    alert('Se ha guardado el producto con éxito');
    //cambiar a la ruta de listado de productos /products
    this.router.navigateByUrl('/products');
  }
}
