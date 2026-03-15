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

  protected readonly code = input<string>();
  protected readonly title = computed(() => (this.code() ? 'Editar' : 'Nuevo'));
  private readonly codeInt = computed(() => Number.parseInt(this.code() ?? '0'));

  protected productForm = this.fb.group({
    code: [0, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(100)]],
    description: null as string | null,
    imageUrl: ['', [Validators.required]],
  });

  ngOnInit(): void {
    console.log('codeInt : ', this.codeInt());
    if (this.codeInt() !== 0) {
      const item = this.productService.getProductByCode(this.codeInt());
      if (item) {
        this.productForm.patchValue({
          code: item?.code,
          name: item?.name,
          price: item?.price,
          description: item?.description,
          imageUrl: item?.imageUrl,
        });
      }
    }
  }

  onSubmit() {
    const product = this.productForm.value as Product;
    if (this.codeInt() === 0) {
      this.productService.createProduct(product);
      alert('Se ha guardado el producto con éxito');
    } else this.productService.updateProduct(this.codeInt(), product);
    alert('Se ha actualizado el producto con éxito');

    //cambiar a la ruta de listado de productos /products
    this.backTolist();
  }

  backTolist() {
    this.router.navigateByUrl('/products');
  }
}
