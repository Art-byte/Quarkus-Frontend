import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { DataMail } from 'src/app/shared/models/dataMail';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import {
  alerPasswordChange,
  ErrorCreatePassword,
  ErrorUpdatePassword,
} from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  _id: string;
  formPass: FormGroup;
  user: User = new User();
  dataMail: DataMail = new DataMail();
  email: string;

  //Datos para bitacora
  ipAddress: string = '';
  action: Action = new Action();
  activityLog: ActivityLog = new ActivityLog();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formPass = this.formBuilder.group({
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  get password() {
    return this.formPass.get('password');
  }
  get confirm() {
    return this.formPass.get('confirm');
  }

  ngOnInit(): void {}

  /**
   * Hay que validar este metodo, esta buscando al usuario por su email correctamente
   * pero detecta como indefinido lo que mandamos despues
   */
  sendMailConfirmation() {
    const user = localStorage.getItem('username');
    this.userService.getUsername(user).subscribe(
      (data) => {
        this.authService.validateEmail(data.email).subscribe((info) => {
          this.email = info.email;
          this.authService.infoToMailSending(this.email).subscribe((check) => {
          });
        });
      },
      (error) => console.log(error)
    );
  }

  updatePassword(): void {
    if (this.password.value === this.confirm.value) {
      const user = localStorage.getItem('username');
      this.userService.getUsername(user).subscribe((data) => {
        this.user = data;
        this.userService
          .updatePassword(
            data.id,
            this.password.value,
            this.confirm.value,
            this.user
          )
          .subscribe(
            (data: User) => {
              //console.log('el password ha sido actualizado correctamente', data);
              this.user = new User();
              alerPasswordChange;
              this.sendMailConfirmation();
              this.authService.createActivityLog(ActionConstants.CAMBIO_DE_CONTRASEÑA,'Modulo usuarios');
              this.gotoList()
              this.Cancel();
            },
            (error) => ErrorUpdatePassword()
          );
      });
    } else {
      this.password.setErrors({ noEsIgual: true });
      ErrorCreatePassword();
    }
  }

  gotoList() {
    this.router.navigate(['login']);
  }

  Cancel() {
    this.authService.sessionKilled();
  }
}
