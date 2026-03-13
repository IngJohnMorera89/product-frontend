import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [
      {
        code: 100001,
        name: 'Computador',
        description:
          'Los computadores HP, incluyendo portátiles (Notebook, Pavilion, ProBook) y de escritorio, ofrecen un rendimiento confiable, diseños modernos y alta portabilidad. Equipados con procesadores Intel Core o AMD Ryzen, suelen incluir pantallas FHD, almacenamiento rápido SSD y seguridad avanzada, ideales para trabajo, estudio y uso diario',
        price: 2600000,
        imageUrl:
          'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/abdf9b43-4a57-4e18-8627-9552e135d925.9f75fcaf168c32a34b27dd87d1b0e422.png',
      },
      {
        code: 200001,
        name: 'Mouse',
        description:
          'Dispositivo apuntador periférico que se conecta al ordenador sin cables físicos, utilizando tecnologías de radiofrecuencia (RF) mediante un receptor USB o tecnología Bluetooth para mayor libertad de movimiento. Funciona con baterías (pilas o recargables), reduciendo el desorden del escritorio y mejorando la ergonomía',
        price: 150000,
        imageUrl: '/image/mouse.webp',
      },
      {
        code: 300001,
        name: 'Monitor',
        description:
          'Pantalla diseñada con una curvatura cóncava que envuelve el campo visual del usuario. Su objetivo es ofrecer una experiencia inmersiva, reducir la fatiga ocular al mantener una distancia uniforme entre el ojo y la pantalla, y mejorar la visión periférica, siendo ideal para gaming, edición de video y multitarea. ',
        price: 750000,
        imageUrl: '/image/monitor.webp',
      },
    ];
  }

  getAllProducts(): Product[] {
    return this.products;
  }
  getProductByCode(code: number): Product | undefined {
    return this.products.find((p) => p.code === code);
  }

  createProduct(item: Product): Product {
    //agregar el producto al final de la lista.

    this.products = [...this.products, item];

    //retornar el producto.
    return item;
  }

  updateProduct(code: number, item: Product): Product | undefined {
    const product = this.getProductByCode(code);

    if (product) {
      product.name = item.name;
      product.description = item.description;
      product.price = item.price;
      product.imageUrl = item.imageUrl;
    }
    return product;
  }

  deleteProduct(code: number): void {
    this.products = this.products.filter((p) => p.code !== code);
  }
}
