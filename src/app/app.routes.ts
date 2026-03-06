import { Routes } from '@angular/router';
import { ProductList } from './features/products/components/product-list/product-list';
import { ProductDetails } from './features/products/components/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductList,
  },

  {
    path: 'products/details',
    component: ProductDetails,
  },
];
