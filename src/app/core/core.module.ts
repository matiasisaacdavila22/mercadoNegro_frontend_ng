import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './services/products/product.service';
import { ProductImagesService } from './services/products/product-images.service';
import { BrandService } from './services/parameters/brand.service';
import { CategoryService } from './services/parameters/category.service';
import { SecurityService } from './services/security/security.service';
import { StoreService } from './services/store/store.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductService,
    ProductImagesService,
    BrandService,
    CategoryService,
    SecurityService,
    StoreService
  ]

})
export class CoreModule { }
