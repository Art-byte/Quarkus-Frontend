import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes, DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import  {  MatPasswordStrengthModule  }  from  '@angular-material-extensions/password-strength' ;
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/interceptors/token.interceptor';




@NgModule({
  declarations: [
    dashboardRoutes,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
    MatPasswordStrengthModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class DashboardModule {}
