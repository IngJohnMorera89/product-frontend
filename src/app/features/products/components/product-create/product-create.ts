import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true, // Asegúrate de tener esto si usas componentes standalone
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate implements OnInit {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);

  protected readonly code = input<string>();
  protected readonly title = computed(() => (this.code() ? 'Editar' : 'Nuevo'));
  private readonly codeInt = computed(() => Number.parseInt(this.code() ?? '0'));
  protected readonly loading = signal(false);

  protected productForm = this.fb.group({
    code: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(100)]],
    description: null as string | null,
    imageUrl: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.codeInt() !== 0) {
      this.loading.set(true); // Activa carga
      this.productService.getProductByCode(this.codeInt()).subscribe({
        next: (item) => {
          this.loading.set(false); // <--- CORRECCIÓN: Desactiva carga al recibir datos
          if (item) {
            this.productForm.patchValue({
              code: item.code,
              name: item.name,
              price: item.price,
              description: item.description,
              imageUrl: item.imageUrl,
            });
          }
        },
        error: (err) => {
          this.loading.set(false); // <--- CORRECCIÓN: Desactiva carga si falla
          console.error(err);
        },
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return; // Protección extra

    this.loading.set(true);
    const product = this.productForm.value as Product;

    const request$ =
      this.codeInt() === 0
        ? this.productService.createProduct(product)
        : this.productService.updateProduct(this.codeInt(), product);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        alert('Operación exitosa');
        this.backTolist();
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Error:', err);
        alert('Ocurrió un error al guardar el producto');
      },
    });
  }

  backTolist() {
    this.router.navigateByUrl('/products');
  }
}
