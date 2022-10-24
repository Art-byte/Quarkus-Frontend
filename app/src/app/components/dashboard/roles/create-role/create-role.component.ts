import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { ErrorCreate, savedConfirmation } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent implements OnInit {
  role: Role = new Role();
  form: FormGroup;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    this.roleService.createRole(this.role).subscribe(
      (data) => {
        this.role = new Role();
        savedConfirmation();
        this.authService.createActivityLog(ActionConstants.NUEVO_REGISTRO, 'Modulo roles');
        this.router.navigate(['/dashboard/roles']); //Redirigimos a la lista de roles
      },
      (error) => {
        ErrorCreate('Error al crear el rol');
        this.router.navigate(['/dashboard/roles']);
      }
    );
  }

}
