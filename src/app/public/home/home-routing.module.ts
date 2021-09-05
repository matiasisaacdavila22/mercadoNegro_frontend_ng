import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './components/default/default.component';
import { StoreListComponent } from '@modules/store/store-list/store-list.component';
import { RegisterComponent } from '@modules/store/register/register.component';
import { LoginComponent } from "@modules/security/login/login.component";

const routes:Routes = [
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'store-list',
    component: StoreListComponent
  }
  ,
  {
    path: 'register',
    component: RegisterComponent
  }
  ,
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule {}
