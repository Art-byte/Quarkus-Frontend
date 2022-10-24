import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { changeConfirmation, ErrorUpdate } from 'src/app/shared/utils/alerts';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  _id: string;
  user: User = new User();;
  form: FormGroup;
  roles: Role[];

  //Datos para bitacora
  action: Action = new Action();
  users: User = new User();
  activityLog: ActivityLog = new ActivityLog();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      crole: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  get crole() {
    return this.form.get('crole');
  }

  ngOnInit(): void {
    this.user = new User();
    this.loadDataFromRoles();
    this._id = this.route.snapshot.params['_id'];
    this.userService.getUserById(this._id).subscribe(
      data => {
        this.user = data;
      },
      (error) => console.log(error)
    );
  }

  updateUser() {
   // this.user.role = this.roles;
    this.userService.updateUser(this._id, this.user, this.crole.value.id).subscribe(
      (data) => {
        this.user = new User();
        this.router.navigate(['/dashboard/users']);
        changeConfirmation()
        this.authService.createActivityLog(ActionConstants.EDITO_REGISTRO,' Modulo usuarios');
      },
      (error) => {
        ErrorUpdate('Error al actualizar el usuario');
        this.router.navigate(['/dashboard/users']);
      }
    );
  }

  //Cargamos todos los roles que usaremos en el droplist
  loadDataFromRoles() {
    return this.roleService
      .getAllRoles()
      .subscribe((role) => (this.roles = role));
  }
 
}
