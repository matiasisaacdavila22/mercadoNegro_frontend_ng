import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthenticatedGuard } from './guards/admin-authenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { DefaultComponent } from './public/home/default/default.component';

const routes: Routes = [
  {
    path: 'home',
    component:DefaultComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module')
     .then(m => m.SecurityModule)
  },
  {
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module')
     .then(m => m.ParametersModule),
     canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module')
     .then(m => m.ProductsModule),
     canActivate: [AuthenticatedGuard]
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module')
     .then(m => m.StoreModule)
  },

 /**this must be the last one*/
{
  path:'**',
  redirectTo: '/home'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
