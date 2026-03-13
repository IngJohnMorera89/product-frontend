import { Routes } from '@angular/router';
import { ProductList } from './features/products/components/product-list/product-list';
import { ProductDetails } from './features/products/components/product-details/product-details';
import { UserList } from './features/users/components/user-list/user-list';
import { UserDetails } from './features/users/components/user-details/user-details';
import { ProductCreate } from './features/products/components/product-create/product-create';
import { UsersCreate } from './features/users/components/users-create/users-create';

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
    path: 'products/new',
    component: ProductCreate,
  },
  {
    path: 'products/edit/:code',
    component: ProductCreate,
  },

  {
    path: 'products/:code',
    component: ProductDetails,
  },

  {
    path: 'users',
    component: UserList,
  },

  {
    path: 'users/new',
    component: UsersCreate,
  },

  {
    path: 'users/:username',
    component: UserDetails,
  },
];
