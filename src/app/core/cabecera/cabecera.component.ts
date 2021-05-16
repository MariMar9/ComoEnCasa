import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuarioConectado = false;
  quitar = false;
  pasa = true;
  categoria: string = '';
  constructor(
    public firestore: AngularFirestore,
    private _CargaScripts: CargarScriptsService,
    private _pasarCategoria: RecetasService,
    private _pasarReceta: RecetasService
  ) {
    this.quitar = _CargaScripts.quitarCabFoot();
    this.usuarioConectado = _CargaScripts.conectado();
  }

  ngOnInit(): void {}

  pasarCategoria(categoria: string) {
    setTimeout(() => {
      this._pasarCategoria.mandarCategoria.emit(categoria);
      this.categoria = categoria;
    }, 200);
  }

  pasarReceta() {
    var nombre = (<HTMLInputElement>document.getElementById('buscar-receta'))!
      .value;
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(nombre);
    }, 200);
  }

  buscar(e: Event) {
    var nombre = '';
    var primeraLetra = '';
    if (nombre != '' || nombre != null) {
      primeraLetra =(<HTMLInputElement>document.getElementById('buscar-receta')).value.charAt(0).toUpperCase()
      nombre = primeraLetra +(<HTMLInputElement>document.getElementById('buscar-receta')).value.substring(1).toLocaleLowerCase();
    }

   

    

    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(nombre);
    }, 200);
  }
}
