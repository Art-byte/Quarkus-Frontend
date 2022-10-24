import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ValidateCodeComponent } from './components/auth/validate-code/validate-code.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RolguardGuard } from './shared/guards/rolguard.guard';

const dashboardModule = () =>
  import('./components/dashboard/dashboard.module').then(
    (x) => x.DashboardModule
  );

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validate-code', component: ValidateCodeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [RolguardGuard],
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
    },
  },
  { path: 'dashboard', loadChildren: dashboardModule },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  ValidateCodeComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
];
