import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  usuarioConectado=false;
  quitar=false;
  url = window.location.pathname;
  constructor() { }

/**
* Para poder tener acceso a todos los js que hemos creado
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
 * Método para saber si hay usuarios conectados
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
      console.log("Hay usuarios conectados");
      return this.usuarioConectado;
    }else{
      this.usuarioConectado=false;
      return this.usuarioConectado;
    }


  }

/**
 * Función para evitar que un usuario pueda acceder a ciertas rutas estando conectado o no conectado
 * @returns devuelve un booleano para redirigir al usuario conectado si intenta acceder
 */
  controlRutaSesionRegistro() {
    /*si el usuario registrado está conectado e intenta acceder al inicio de sesión o registro redirige al inicio*/
    if(localStorage.usuario!=null){
      window.location.href="/inicio";
      return false;
    /*como la anterior pero para usuarios de gmail */
    }else if(localStorage.usuarioGoogle!=null){
      window.location.href="/inicio";
      return false;
    /*si no esta conectado no redirige */
    }else{
      return true;
    }
  }

/**
 * Como el caso anterior (controlRutaSesionRegistro()) pero para que los usuarios desconectados no puedan acceder a la ruta del perfilUsuario
 * @returns devuelve un booleano para redirigir al usuario desconectado si intenta acceder
 */
  controlRutaPerfil(){
    if(localStorage.usuario!=null){
      return true;
    }else if(localStorage.usuarioGoogle!=null){
      return true;
    }else{
      window.location.href="/inicio";
      return false;
    }
  }
/**
 * Quita o muestra la cabecera ey el footer en determinadas rutas (iniciarSesion,registro,crearReceta)
 * @returns this.quitar: booleano enviado a la cabecera y al footer
 */
  quitarCabFoot() {
    if(this.url=="/iniciarSesion" || this.url=="/registro" || this.url=="/crearReceta"){
      this.quitar=true;
      console.log("si url"+this.quitar)
      return this.quitar;
    }else{
      this.quitar=false;
      return this.quitar;
    }
  }
}
