import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Injectable({
  providedIn: 'root'
})
export class ControlRutaGuard implements CanActivate {
  
  constructor(private _controlRuta: CargarScriptsService){}
 /**
  * @description comprueba si se ha iniciado una sesión, para permitir el acceso al pregistro o inicio de sesión
  * @param route: información de la ruta  asociada a un componente 
  * @param state:  estado de la ruta
  * @returns: booleano, para comrobar si se ha iniciado una sesión y que tipo de usuario la ha iniciado
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.usuario != null) {
        window.location.href = '/inicio';
        return false;
        /*como la anterior pero para usuarios de gmail */
      } else if (localStorage.usuarioGoogle != null) {
        window.location.href = '/inicio';
        return false;
        /*si no esta conectado no redirige */
      } else {
        return true;
      }
  }
  
}
