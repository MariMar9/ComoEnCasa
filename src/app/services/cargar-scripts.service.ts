import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  usuarioConectado=false;
  quitar=false;
  url = window.location.pathname;
  constructor() { }
  /*Para poder tener acceso a todos los js que hemos creado*/
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

  conectado() {
    if(localStorage.usuario!=null){
      this.usuarioConectado=true;
      console.log("Hay usuarios conectados");
      return this.usuarioConectado;
    }else if(localStorage.usuarioGoogle!=null){
      this.usuarioConectado=true;
      console.log("Hay usuarios conectados");
      return this.usuarioConectado;
    }else{
      this.usuarioConectado=false;
      console.log("No hay usuarios conectados.");
      return this.usuarioConectado;
    }


  }

  controlRutaSesionRegistro() {
    if(localStorage.usuario!=null){
      window.location.href="/inicio";
      return false;
    }else if(localStorage.usuarioGoogle!=null){
      window.location.href="/inicio";
      return false;
    }else{
      return true;
    }
  }

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

  quitarCabFoot() {
    if(this.url=="/iniciarSesion" || this.url=="/registro" || this.url=="/crearReceta"){
      console.log("puede pasar")
      this.quitar=true;
      console.log("si url"+this.quitar)
      return this.quitar;
    }else{
      console.log("no puede pasar")
      this.quitar=false;
      console.log("no url"+this.quitar)
      return this.quitar;
    }
  }


}
