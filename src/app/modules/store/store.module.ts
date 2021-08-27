import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreListComponent } from './store-list/store-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    RegisterComponent,
    StoreDetailComponent,
    StoreListComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class StoreModule { }
