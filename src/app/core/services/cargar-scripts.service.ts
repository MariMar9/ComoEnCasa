import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CargarScriptsService {
  /**variables */
  usuarioConectado=false;
  quitar=false;
  url = window.location.pathname;
  constructor( private _cookieService: CookieService ) {}

/**
* @description Para poder tener acceso a todos los js que hemos creado
* 
* @param archivos: el nombre del archivo .js hubicado en assets 
*/
  carga(archivos:string[]){
    /**el nombre del archivo se lo pasamos desde app.components.ts */
    for(let archivo of archivos){
      /*primero creamos la etiqueta <script></script>*/
      let script = document.createElement("script");
      /*despues ponemos el atributo src y la ruta */
      script.src = "../assets/"+ archivo + ".js";
      /*Obtenemos el <body></body> para insertar los <sripts></sripts> creados*/
      let body =document.querySelectorAll("body")[0];
      body.appendChild(script);
    }
  }
  
/**
 * @description Método para saber si hay usuarios conectados
 * @returns devuelve un booleano para saber si el usuario está conectado
 */
  conectado() {
    /*usuarios sin inicio de sesión por google*/
    if(localStorage.usuario!=null){
      this.usuarioConectado=true;
      return this.usuarioConectado;
    /**usuarios con inicio de sesión en google*/
    }else if(localStorage.usuarioGoogle!=null){
      this.usuarioConectado=true;
      return this.usuarioConectado;
    }else{
      this.usuarioConectado=false;
      return this.usuarioConectado;
    }
  }

/**
 * @description Quita o muestra la cabecera y el footer en determinadas rutas (iniciarSesion,registro,crearReceta)
 * @returns this.quitar: booleano enviado a la cabecera y al footer, para mostrarlos u ocultarlos
 */
  quitarCabFoot() {
    if(this.url=="/iniciarSesion" || this.url=="/registro" || this.url=="/crearReceta"){
      this.quitar=true;
      return this.quitar;
    }else{
      this.quitar=false;
      return this.quitar;
    }
  }
}
