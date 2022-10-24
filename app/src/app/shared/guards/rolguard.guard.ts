import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RolguardGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot){

    /**
     * Validacion de acceso a las rutas por Rol de usuario
     * Esto lo comparamos con la variable definida en la ruta 
     */

    return this.isAuthorized(route);
  }
  
  private isAuthorized(route: ActivatedRouteSnapshot): boolean{
    const roles = localStorage.getItem('role');
    const expectedRole = route.data.expectedRole;
    return (expectedRole.includes(roles)) ? true : false;

  }
  
}
