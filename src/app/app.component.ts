import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//importamos los scripts
import { CargarScriptsService } from "../app/services/cargar-scripts.service";
import { RecetasService } from './services/recetas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ComoEnCasa';
  mail="jh@gmail.com"
  password="123456"

  categoria:string="";
  constructor(public firestore: AngularFirestore,private _CargaScripts:CargarScriptsService,private _pasarCategoria: RecetasService){
    /*ponemos la ruta y el nombre del archico que pasaremos a la función carga de cargar-ScriptsService.ts*/
    _CargaScripts.carga(["js/javaScript"]);

  }

}
