import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: 'order-list',
    component: OrderListComponent
  },
  {
    path: 'create-creation',
    component: OrderCreateComponent,
  //  canActivate: [AdminAuthenticatedGuard]
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent,
    //canActivate: [ManagerAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
