import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuarioConectado = false;

  constructor(private _CargaScripts: CargarScriptsService, private _pasarCategoria: RecetasService) {
    this.usuarioConectado = _CargaScripts.conectado();
  }

  ngOnInit(): void {}

  /*Con el método "emit" manda el dato.*/
  pasarCategoria(categoria: string){
    this._pasarCategoria.mandarCategoria.emit(categoria);
  }

}
