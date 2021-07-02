import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthenticatedGuard } from 'src/app/guards/admin-authenticated.guard';
import { ManagerAuthenticatedGuard } from 'src/app/guards/manager-authenticated.guard';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductListComponent } from './admin/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product-creation',
    component: ProductCreationComponent,
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'product-edition/:id',
    component: ProductEditionComponent,
    canActivate: [ManagerAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
