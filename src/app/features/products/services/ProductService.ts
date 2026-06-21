import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { StorageService } from '../../../Shared/service/storageService';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor(private readonly storage: StorageService) {
    const stored = storage.getProducts();

    // Si no hay productos guardados, inicializamos con los 20 de tecnología
    if (!stored || stored.length === 0) {
      this.products = this.generateInitialProducts();
      this.saveAll();
    } else {
      this.products = stored;
    }
  }

  private generateInitialProducts(): Product[] {
    return [
      {
        code: 1,
        name: 'Laptop Gamer ASUS',
        price: 5500000,
        description: 'Laptop Gamer de alta gama con procesador Ryzen 9.',
        imageUrl: 'https://media.falabella.com/falabellaCO/151988902_001/w=1500,h=1500,fit=cover',
      },
      {
        code: 2,
        name: 'iPad Pro 12.9"',
        price: 4800000,
        description: 'Tablet profesional con pantalla Liquid Retina.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALWnSi2N_mtQ5qu5zVXGSeEiE7hu9HbEfasze1DXvqg&s=10',
      },
      {
        code: 3,
        name: 'Mouse Logitech MX',
        price: 450000,
        description: 'Mouse ergonómico para productividad.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7tHt-A7noUMvgwQYNM6glSHIuM0TCH30LEhkzAINBQ&s=10',
      },
      {
        code: 4,
        name: 'Teclado Mecánico',
        price: 380000,
        description: 'Teclado retroiluminado con switches mecánicos.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDiAvvQsB6NGHDQThrJQDe3zJM8-iqMm-mnYv44GjBQ&s=10',
      },
      {
        code: 5,
        name: 'Monitor LG UltraWide',
        price: 2200000,
        description: 'Monitor curvo de 34 pulgadas para diseño.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWgajJQ26vEKthQmVlcSHcNtc_MwYtl3OhnL17SXb9g&s',
      },
      {
        code: 6,
        name: 'Auriculares Sony',
        price: 1600000,
        description: 'Cancelación de ruido premium.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2QRPk3E22sd_c8yJdZZBRLkYH-fiXbsOj-YQX6rTXOg&s=10',
      },
      {
        code: 7,
        name: 'Webcam Logitech',
        price: 320000,
        description: 'Cámara Full HD 1080p.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwwrmtljEllmTpfU0yR5a9qEAtHZfMAtlVoFBh3SsROQ&s=10',
      },
      {
        code: 8,
        name: 'SSD Samsung 1TB',
        price: 550000,
        description: 'Unidad de estado sólido NVMe ultra rápida.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdf-4Kh3D0FZINSpfJj7gtBpSSfeSBIgdCoEjPzSHwA&s',
      },
      {
        code: 9,
        name: 'RAM Corsair 32GB',
        price: 480000,
        description: 'Memoria RAM DDR4 de alto rendimiento.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenlxU2jG00d3dppZm3jMP9P2b9R6a6f9gH5Rx1hb61w&s=10',
      },
      {
        code: 10,
        name: 'Silla Ergonómica',
        price: 3500000,
        description: 'Silla para oficina de alto confort.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBAd-ltfVhK4kJjhIIHW0va6hcaOFsY0_VI7mFBcHkmA&s=10',
      },
      {
        code: 11,
        name: 'Micrófono Blue Yeti',
        price: 520000,
        description: 'Micrófono profesional para streaming.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2Y7e8qheI1kQEr_qaMYos5738sdXOISHZEHdf8XjHQ&s=10',
      },
      {
        code: 12,
        name: 'Apple Watch',
        price: 2100000,
        description: 'Reloj inteligente con GPS y salud.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkWMB59IBkkcXbJMcaRZgq_zNYYnS0w5zGZvTMxTqWg&s',
      },
      {
        code: 13,
        name: 'Cargador Anker',
        price: 180000,
        description: 'Cargador de pared de carga rápida.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJnXdu_Lb5tLkbM9vVicUrqPejooKjeb7YA35r09y4Q&s=10',
      },
      {
        code: 14,
        name: 'Hub USB-C Satechi',
        price: 250000,
        description: 'Adaptador USB multipuerto.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_vPXrfaMOPItG-lXX4r3MH6g1AbozbiVXH4pV8sKr9g&s=10',
      },
      {
        code: 15,
        name: 'Altavoces Bose',
        price: 600000,
        description: 'Sistema de audio multimedia.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQipKMlVHm0-azg7X3jD1AAtASZ09FgOpvHxFBB4p4L7g&s=10',
      },
      {
        code: 16,
        name: 'Router ASUS ROG',
        price: 1400000,
        description: 'Router para gaming de alto alcance.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVp_UXEBwSBYiOsD-iuOpDitpV16wW7AFiSnA4X3-wQ&s=10',
      },
      {
        code: 17,
        name: 'Impresora HP Laser',
        price: 950000,
        description: 'Impresora láser inalámbrica.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLHm344LFl58M2Z18Ccg1PfnLK1qrTpTdZyzeAEM_37Q&s=10',
      },
      {
        code: 18,
        name: 'Luz LED Elgato',
        price: 420000,
        description: 'Iluminación para streaming y video.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjgGiFktyXnx9TzcjcVNAkUlD21VcLN-DDbIQE89K1w&s=10',
      },
      {
        code: 19,
        name: 'Soporte Laptop',
        price: 120000,
        description: 'Base ajustable para portátiles.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8R4biVs-KI4TwFwe_luzW7s14Rg5FW8qPaQGINVhLHg&s=10',
      },
      {
        code: 20,
        name: 'Cable HDMI',
        price: 85000,
        description: 'Cable de alta velocidad 4K.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6Fj8wbE9mWjpm9F4I9aUl753yDOmjvimtG4dz-VKGA&s',
      },
      {
        code: 21,
        name: 'Iphone 17 Pro Max',
        price: 7000000,
        description: 'Smartphone de última generación.',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI4-KyJRVd4zfY8Kr5Bi5xf_nj2H3f7mgEeLuFPR_lqw&s=10',
      },
    ];
  }

  // Mantenemos tus métodos originales sin cambios
  getAllProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(200));
  }

  getProductByCode(code: number): Observable<Product | undefined> {
    return of(this.products.find((p) => p.code === code)).pipe(delay(200));
  }

  createProduct(item: Product): Observable<Product> {
    this.products = [...this.products, item];
    this.saveAll();
    return of(item).pipe(delay(500));
  }

  updateProduct(code: number, item: Product): Observable<Product | undefined> {
    const product = this.products.find((p) => p.code === code);
    if (product) {
      product.name = item.name;
      product.description = item.description;
      product.price = item.price;
      product.imageUrl = item.imageUrl;
    }
    this.saveAll();
    return of(product).pipe(delay(500));
  }

  deleteProduct(code: number): Observable<void> {
    this.products = this.products.filter((p) => p.code !== code);
    this.saveAll();
    return of(void 0).pipe(delay(300));
  }

  private saveAll(): void {
    this.storage.saveproducts(this.products);
  }
}
