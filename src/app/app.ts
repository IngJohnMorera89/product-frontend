import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './features/products/components/product-list/product-list';
import { ProductDetails } from './features/products/components/product-details/product-details';
import { WindowsService } from './shared/services/windows';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected windowService = inject(WindowsService);
}
