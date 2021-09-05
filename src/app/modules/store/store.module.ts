import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [
    StoreDetailComponent
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
