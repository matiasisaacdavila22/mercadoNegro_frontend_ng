import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultComponent } from './components/default/default.component';

const routes:Routes = [
  {
    path: '',
    component: DefaultComponent
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
