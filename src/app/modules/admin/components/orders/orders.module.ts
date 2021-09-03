import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderCreateComponent } from './order-create/order-create.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderCreateComponent

  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ]
})
export class OrdersModule { }
