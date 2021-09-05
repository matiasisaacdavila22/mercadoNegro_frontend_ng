import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanerComponent } from "./components/baner/baner.component";
import { DefaultComponent } from "./components/default/default.component";
import { HomeRoutingModule } from "./home-routing.module";
import { StoreListComponent } from "@modules/store/store-list/store-list.component";
import { MaterialModule } from '@material/material.module';
import { RegisterComponent } from "@modules/store/register/register.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from "@modules/security/login/login.component";


@NgModule({
  declarations: [
    BanerComponent,
    DefaultComponent,
    StoreListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports:[
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
   ]
})

export class HomeModule {

}
