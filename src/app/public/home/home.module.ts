import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BanerComponent } from "./components/baner/baner.component";
import { DefaultComponent } from "./components/default/default.component";
import { HomeRoutingModule } from "./home-routing.module";
import { MaterialModule } from "src/app/modules/material/material.module";
import { NavbarComponent } from "../master-page/navbar/navbar.component";

@NgModule({
  declarations: [
    BanerComponent,
    DefaultComponent,
    NavbarComponent
  ],
  imports:[
    HomeRoutingModule,
    CommonModule,
    MaterialModule
  ]
})

export class HomeModule {

}
