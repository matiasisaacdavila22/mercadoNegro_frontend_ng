import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { UnauthenticatedGuard } from 'src/app/guards/unauthenticated.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'reset',
    component: PasswordResetComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'user-edition/:id',
    component: UserEditionComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'user-creation',
    component: UserCreationComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
