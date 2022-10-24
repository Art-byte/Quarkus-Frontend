import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CloseSession } from 'src/app/shared/utils/alerts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.getUserByStatus()
    this.setTimeOut();
    this.userInactive.subscribe(() => {
      this.authService.logout();
      this.router.navigate(['login']);
      CloseSession(
        'Sesión finalizada',
        'Por seguridad, hemos cerrado tu sesión'
      );
    });
  }

  ngOnDestroy(): void {
      console.log('se supone que ya murio')
  }

  //Validamos el tiempo de inactividad del usuario
  setTimeOut() {
    this.userActivity = setTimeout(() => {
      if (this.authService.logout) {
        this.userInactive.next(undefined);
      }
      //60000 = 1 min
    }, 900000); //900000 = 15 min
  }

  //Investigar que mas eventos podemos agregar y como se deben agregar
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeOut();
  }


   /**
     * Si es la primera vez que el usuario ingresa al sistema, entonces debera
     * actualizar su password
     */
  getUserByStatus() {
    const status = localStorage.getItem('status');
    if (status == 'primer acceso') {
        this.ChangeYourPassword(
        'Este es tu primer ingreso al sistema',
        'Al ser tu primer ingreso, te pedimos que por favor cambies tu password.'
      );
    
     
    }
  }

    //alerta para camgiar el password al primer ingrespo
    ChangeYourPassword = (title: string, text: string) => {
      Swal.fire({
        icon: 'info',
        title: title,
        text: text,
        confirmButtonColor: '#3f51b5',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/dashboard/profile']);
        }
      });
    };
}
