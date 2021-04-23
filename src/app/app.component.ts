import { Component } from '@angular/core';
//importamos los scripts
import { CargarScriptsService } from "./cargar-scripts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ComoEnCasa';

  constructor(private _CargaScripts:CargarScriptsService){
    /*ponemos la ruta y el nombre del archico que pasaremos a la función carga de cargar-ScriptsService.ts*/
    _CargaScripts.carga(["js/ocultar"]);
  }

}
