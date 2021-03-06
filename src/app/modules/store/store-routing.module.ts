import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from 'src/app/guards/unauthenticated.guard';
import { RegisterComponent } from './register/register.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
  {
    path: 'store-details',
    component: StoreDetailComponent
  },
  {
    path: 'store-edit/:id',
    component: StoreDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
