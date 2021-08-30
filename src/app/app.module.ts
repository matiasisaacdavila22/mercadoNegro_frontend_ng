import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "src/app/modules/material/material.module";
import { LayoutComponent } from './public/master-page/layout/layout.component';
import { SharedModule } from './public/shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),

   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
