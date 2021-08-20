import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from 'src/app/guards/unauthenticated.guard';
import { RegisterComponent } from './register/register.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';

const routes: Routes = [
  {
    path: 'store-details/:id',
    component: StoreDetailComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
