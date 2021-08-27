import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    PasswordResetComponent,
    ChangePasswordComponent,
    UserListComponent,
    UserEditionComponent,
    UserCreationComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule
  ]
})
export class SecurityModule { }
