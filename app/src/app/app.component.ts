import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
import { ErrorNetworkAlert, InternetSuccess } from './shared/utils/alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';

  window: any;
  public netStatus: string;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(
      "                                                                                      \n"+ 
      " ██████╗ ██╗   ██╗ █████╗ ██████╗ ██╗  ██╗██╗   ██╗███████╗     █████╗ ██████╗ ██████╗ \n" +
      "██╔═══██╗██║   ██║██╔══██╗██╔══██╗██║ ██╔╝██║   ██║██╔════╝    ██╔══██╗██╔══██╗██╔══██╗\n" +
      "██║   ██║██║   ██║███████║██████╔╝█████╔╝ ██║   ██║███████╗    ███████║██████╔╝██████╔╝\n" +
      "██║▄▄ ██║██║   ██║██╔══██║██╔══██╗██╔═██╗ ██║   ██║╚════██║    ██╔══██║██╔═══╝ ██╔═══╝ \n" +
      "╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║  ██╗╚██████╔╝███████║    ██║  ██║██║     ██║     \n" +
      " ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝     \n" +
      "                                                                                       "
    )
   // this.windowClosing();

    /**
     * Cons esto podemos validar si ya se tenia una sesion previa,
     * si el usuario estaba logeado, ingresas directamente a dashboard ya que detecta el token
     * si no, te redirecciona a login. 
     * si se va a usar esta funcionalidad, descomentala y comenta la funcion windowClosing
    */
     if (this.authService.verifyLogged()) {
       this.router.navigate(['dashboard']);
     } else {
       this.router.navigate(['login']);
     }


                    //Funciones para la deteción de la red
//==========================================================>
fromEvent(window, 'offline').pipe(
  debounceTime(100)).subscribe((event: Event) =>{
  ErrorNetworkAlert();
    this.netStatus = event.type;

  });

fromEvent(window, 'online').pipe(
  debounceTime(100)).subscribe((event: Event) =>{
  InternetSuccess();
  this.netStatus = event.type;
  window.location.reload();
  });
//==========================================================>

  }



  /**
   * Esta funcion sirve para escuchar el evento de cerrado de ventana
   * si el usuario cierra una ventana en el navegador, automaticamente mata 
   * la sesion y sesiones que se tengan abiertas en otra ventanas 
   */
  windowClosing() {
    window.addEventListener('beforeunload', () => {
      console.log('Ventana cerrada');
      localStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    });

  }



}
