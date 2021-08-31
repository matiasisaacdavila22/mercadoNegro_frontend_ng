import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


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
    path: '',
    component:DashboardComponent
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
