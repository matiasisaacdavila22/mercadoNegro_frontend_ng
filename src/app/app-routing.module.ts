import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminAuthenticatedGuard } from './guards/admin-authenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LayoutComponent } from './public/master-page/layout/layout.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
  {
    path: 'home',
    loadChildren: () => import('./public/home/home.module')
    .then(m => m.HomeModule)
   // component:DefaultComponent
  },
]
  },
  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module')
     .then(m => m.SecurityModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module')
     .then(m => m.StoreModule)
  },
  {
    path:'admin',

    loadChildren: () => import('./modules/admin/admin.module')
    .then(m => m.AdminModule)
  },

 /**this must be the last one*/
{
  path:'**',
  redirectTo: '/home'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
