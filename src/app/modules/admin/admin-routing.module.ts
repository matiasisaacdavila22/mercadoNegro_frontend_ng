import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { UserModule } from './components/user/user.module';
import { AdminAuthenticatedGuard } from '@guards/admin-authenticated.guard';
import { ManagerAuthenticatedGuard } from '@guards/manager-authenticated.guard';


const routes: Routes = [
  {
    path: '',
    component:SiderComponent,
    children: [
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
    loadChildren: () => import('@admin/components/products/products.module')
     .then(m => m.ProductsModule),
   },
   {
    path: 'user',
    loadChildren: () => import('./components/user/user.module')
     .then(m => m.UserModule),
   },
   {
    path: 'parameters',
    loadChildren: () => import('./components/parameters/parameters.module')
     .then(m => m.ParametersModule),
   },
   {
    path: 'order',
    loadChildren: () => import('./components/orders/orders.module')
     .then(m => m.OrdersModule),
   }

   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
