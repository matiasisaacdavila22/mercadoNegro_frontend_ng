import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { UserModule } from './components/user/user.module';




@NgModule({
  declarations: [ProductFormComponent, SiderComponent, DashboardComponent, StoreComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    UserModule

   ]
})
export class AdminModule { }
