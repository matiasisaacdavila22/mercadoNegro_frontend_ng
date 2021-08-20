import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreDetailComponent } from './store-detail/store-detail.component';


@NgModule({
  declarations: [
    RegisterComponent,
    StoreDetailComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StoreModule { }
