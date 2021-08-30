import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SiderComponent } from './components/sider/sider.component';


const routes: Routes = [
  {
    path: '',
    component:SiderComponent,
    children: [
  {
    path: 'create',
    component:ProductFormComponent
  },
  {
    path: 'products',
    loadChildren: () => import('../products/products.module')
     .then(m => m.ProductsModule),
   },
   {
    path: 'parameters',
    loadChildren: () => import('../parameters/parameters.module')
     .then(m => m.ParametersModule),
   },
   {
    path: 'security',
    loadChildren: () => import('../security/security.module')
     .then(m => m.SecurityModule),
   },
   {
    path: 'store',
    loadChildren: () => import('../store/store.module')
     .then(m => m.StoreModule),
   },
   {
    path: 'order',
    loadChildren: () => import('../order/order.module')
     .then(m => m.OrderModule),
   }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
