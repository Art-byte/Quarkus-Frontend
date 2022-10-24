import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolguardGuard } from 'src/app/shared/guards/rolguard.guard';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { RolesComponent } from './roles/roles.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { CreateStatusComponent } from './status/create-status/create-status.component';
import { StatusComponent } from './status/status.component';
import { UpdateStatusComponent } from './status/update-status/update-status.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'activity-log',
        component: ActivityLogComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },

      {
        path: 'create-role',
        component: CreateRoleComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'update-role/:_id',
        component: UpdateRoleComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },

      {
        path: 'create-status',
        component: CreateStatusComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'update-status/:_id',
        component: UpdateStatusComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },

      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
      {
        path: 'update-user/:_id',
        component: UserUpdateComponent,
        canActivate: [RolguardGuard],
        data: {
          expectedRole: ['ROLE_ADMIN', 'ROLE_CNOC', 'ROLE_PROVE', 'ROLE_CORP'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

export const dashboardRoutes = [
  DashboardComponent,
  HomeComponent,
  UsersComponent,
  RolesComponent,
  StatusComponent,
  ActivityLogComponent,
  ProfileComponent,
  CreateRoleComponent,
  UpdateRoleComponent,
  CreateStatusComponent,
  UpdateStatusComponent,
  CreateUserComponent,
  UserUpdateComponent,
];
