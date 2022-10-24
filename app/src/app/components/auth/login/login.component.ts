import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { ErrorUser, LimitToLogin, UserBlocked, WelcomeAlert } from 'src/app/shared/utils/alerts';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  trayToLogingCount: number = 0;

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Getters
  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form.reset();
  }

  login() {
    this.authService.login(this.form.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role.name);
        localStorage.setItem('status', res.status);

        const userAvailable = localStorage.getItem('status');
        if (userAvailable === 'inactivo') {
          localStorage.clear();
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('role');
          localStorage.removeItem('status');
          this.form.reset();
          this.router.navigate(['login']);
          UserBlocked();
        } else {
          this.loading = true;
          setTimeout(() => {
            this.authService.createActivityLog(ActionConstants.INICIO_DE_SESION)
            this.router.navigate(['dashboard']);
            const username = localStorage.getItem("username");
            WelcomeAlert(username);
          }, 1500);
        }
      },
      (error) => {
        if(error.status === 401){
          ErrorUser()
          this.trayToLogingCount++;
          if (this.trayToLogingCount === 5) {
            //Despues de los intentos, capturamos lo el usuario que
            //esta en el form y lo editamos pasando su estatus a inactivo
            this.userService
              .getUsername(this.username.value)
              .subscribe((user) => {
                this.userService.blockUser(user.id, user).subscribe((data) => {
                  console.log('Se ha desactivado la cuenta');
                  LimitToLogin();
                });
              });
          }
        }

      }
    );
  }

  get f() {
    return this.form.controls;
  }

  errorMessage() {
    this.snackBar.open('Usuario o password incorrecto', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
