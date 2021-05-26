import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Injectable({
  providedIn: 'root'
})
export class ControlPerfilUsuarioGuard implements CanActivate {

  constructor(private _controlRuta: CargarScriptsService){}
  
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
