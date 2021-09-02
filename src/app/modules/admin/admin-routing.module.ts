import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { UserModule } from './components/user/user.module';
import { AdminAuthenticatedGuard } from 'src/app/guards/admin-authenticated.guard';
import { ManagerAuthenticatedGuard } from 'src/app/guards/manager-authenticated.guard';


const routes: Routes = [
  {
    path: '',
    component:SiderComponent,
    children: [
  {
    path: 'create',
    component:ProductFormComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: '',
    component:DashboardComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'store',
    component:StoreComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('../products/products.module')
     .then(m => m.ProductsModule),
   },
   {
    path: 'user',
    loadChildren: () => import('./components/user/user.module')
     .then(m => m.UserModule),
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
