import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SiderComponent } from './components/sider/sider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [ProductFormComponent, SiderComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,

   ]
})
export class AdminModule { }
