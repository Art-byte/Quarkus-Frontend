import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { DataMail } from 'src/app/shared/models/dataMail';
import { User } from 'src/app/shared/models/user';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { ActivityLogService } from 'src/app/shared/services/activity-log.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { sendingEmailAlerts } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  _id: string;
  loading = false;
  vars = false;
  dataMail: DataMail = new DataMail();
  user: User = new User();

  //Datos para bitacora
  ipAddress: string = '';
  action: Action = new Action();
  activityLog: ActivityLog = new ActivityLog();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private activityLogService: ActivityLogService,
    private actionService: ActionsService,
    private statusService: StatusService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  sendingEmail() {
    //Consultamos al back end para validar el email
    this.authService.validateEmail(this.f.email.value).subscribe((mailBool) => {
        //Despues de validado, consultamos de nuevo y esta vez le manda el email
        this.authService.checkinEmailToPass(mailBool).subscribe((user: User) => {
            sendingEmailAlerts()
            this.router.navigate(['validate-code']);
          });

        // this.loading = true;
        // //cachamos el Objecto respuesta y lo convertimos en string para obtener su id
        // this.user._id = JSON.stringify(mailBool['id']);
        // this._id = JSON.parse(this.user._id);
        // //Mandamos el id capturado a una consulta para enviarlo a reset password para su edicion
        // this.userService.getUserById(this._id).subscribe((data) => {
        //   setTimeout(() => {
        //     console.log('has llegado hasta aqui');
        //     this.router.navigate(['reset-password', this._id]);
        //   }, 1500);
        // });
      },
      (error) => {
        console.error(error);
        this.errorEmail();
      }
    );

  }

  errorEmail() {
    this.snackBar.open('El email ingresado no existe en la base de datos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
