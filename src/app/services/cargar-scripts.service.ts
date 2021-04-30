import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  usuarioConectado=false;

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
    }else{
      this.usuarioConectado=false;
      console.log("No hay usuarios conectados.");
      return this.usuarioConectado;
    }
  }

}
