import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './public/master-page/navbar/navbar.component';
import { SideMenuComponent } from './public/master-page/side-menu/side-menu.component';
import { HeroComponent } from './public/master-page/hero/hero.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideMenuComponent,
    HeroComponent,
    FooterComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
