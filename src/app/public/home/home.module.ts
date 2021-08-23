import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BanerComponent } from "./components/baner/baner.component";
import { DefaultComponent } from "./components/default/default.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [
    BanerComponent,
    DefaultComponent
  ],
  imports:[
    HomeRoutingModule,
    CommonModule
  ]
})

export class HomeModule {

}
