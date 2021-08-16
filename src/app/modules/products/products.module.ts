import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductImagesComponent } from './product-images/product-images.component';

@NgModule({
  declarations: [
    ProductCreationComponent,
    ProductEditionComponent,
    ProductListComponent,
    ProductImagesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductsModule { }
