import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Injectable({
  providedIn: 'root'
})
export class ControlPerfilUsuarioGuard implements CanActivate {

  constructor(private _controlRuta: CargarScriptsService){}
  /**
   * @description comprueba si se ha iniciado una sesión, para permitir el acceso al perfil del usuario
   * @param route: información de la ruta  asociada a un componente  
   * @param state:  estado de la ruta 
   * @returns: booleano, para comrobar si se ha iniciado una sesión y que tipo de usuario la ha iniciado
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.usuario == null && localStorage.usuarioGoogle == null) {
        window.location.href = '/iniciarSesion';
        return false;
        /*si no esta conectado no redirige */
      } else {
        return true;
      }
  }
  
}
