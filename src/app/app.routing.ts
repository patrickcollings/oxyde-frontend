import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuard],
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },
  { path: 'login',    component: LoginComponent },
  { path: 'signup',   component: SignupComponent },
  { path: 'verify',   component: VerifyComponent },
  { path: 'reset',    component: NewPasswordComponent },
  { path: 'password', component: PasswordResetComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {

    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
