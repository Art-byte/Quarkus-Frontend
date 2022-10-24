import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants, Constants } from 'src/app/shared/utils/actionconstants';
import { ErrorCreate, savedConfirmation } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  roles: Role[];
  form: FormGroup;
  showDetails: boolean = false;


  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(Constants.patternTEXT)]],
      email: ['', Validators.required],
      phone: ['',Validators.required],
      crole: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(new RegExp(Constants.pattertPassword))]],
    });
  }

  get crole() {
    return this.form.get('crole');
  }

  ngOnInit(): void {
    this.loadDataFromRoles();
  }


  loadDataFromRoles() {
    return this.roleService
      .getAllRoles()
      .subscribe((role) => (this.roles = role));
  }

  save() {
    this.userService.createUser(this.form.value, this.crole.value.id).subscribe(
      (data) => {
        this.user = new User();
        savedConfirmation();
        this.authService.createActivityLog(ActionConstants.NUEVO_REGISTRO, ' Modulo usuarios');
        this.router.navigate(['/dashboard/users']); // Lista de usuarios
      },
      (error) => {
        ErrorCreate('Error al crear el usuario');
        this.router.navigate(['/dashboard/users']);
      }
    );
  }

  onStrengthChangeds(strength: number) {
  }
}
