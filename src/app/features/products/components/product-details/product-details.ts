import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { WindowsService } from '../../../../shared/services/windows';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  protected readonly windowService = inject(WindowsService);

  protected readonly product = signal<Product>({
    code: 200001,
    name: 'Mouse',
    imageUrl: 'https://m.media-amazon.com/images/I/61ZzHgrfhyL._AC_UF894,1000_QL80_.jpg',
    description:
      'ONIKUMA GAMING Mouse para videojuegos, mouse de computadora con 5 DPI ajustables hasta 6400, mouse con cable para computadora portátil/PC, mouse ergonómico para jugadores con 7 botones programables, mouse óptico para Windows Vista, rosa',
    price: 150000,
  });

  onBack() {
    this.windowService.setActualWindow('list');
  }
}
