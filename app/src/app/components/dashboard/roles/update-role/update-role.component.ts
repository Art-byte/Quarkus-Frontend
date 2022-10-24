import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { changeConfirmation, ErrorUpdate } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  _id: string;
  role: Role;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.role = new Role();
    this._id = this.route.snapshot.params['_id'];
    this.roleService.getRole(this._id).subscribe(
      (data) => {
        this.role = data;
      },
      (error) => console.log(error)
    );
  }


  updateRole() {
    this.roleService.updateRole(this._id, this.role).subscribe(
      (data) => {
        console.log(data);
        this.role = new Role();
        changeConfirmation();
        this.authService.createActivityLog(ActionConstants.EDITO_REGISTRO, 'Modulo roles');
        this.router.navigate(['/dashboard/roles']);
      },
      (error) => {
        ErrorUpdate('Error al editar el rol');
        this.router.navigate(['/dashboard/roles']);
      }
    );

  }
}
