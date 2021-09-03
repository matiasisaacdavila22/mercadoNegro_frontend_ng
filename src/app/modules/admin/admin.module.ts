import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { UserModule } from './components/user/user.module';
import { OrdersModule } from './components/orders/orders.module';
import { ProductsModule } from './components/products/products.module';
import { ParametersModule } from './components/parameters/parameters.module';


@NgModule({
  declarations: [
    SiderComponent,
    DashboardComponent,
    StoreComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    UserModule,
    OrdersModule,
    ProductsModule,
    ParametersModule
   ]
})
export class AdminModule { }
