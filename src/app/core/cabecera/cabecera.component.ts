import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';
import { RecetasService } from '../services/recetas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  /**variables */
  usuarioConectado = false;
  quitar = false;
  categoria: string = '';
  recetas: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    private _CargaScripts: CargarScriptsService,
    private _pasarCategoria: RecetasService,
    private _pasarReceta: RecetasService,
    private route: Router
  ) {
    this.quitar = _CargaScripts.quitarCabFoot();
    this.usuarioConectado = _CargaScripts.conectado();
    this.recetas = this._pasarReceta.getCollectionRecetas<any>(
      '/recetas',
      'id'
    );
  }

  ngOnInit(): void {}
  /**
   * @description método para enviar la categoría al componente recetas y mostrar recetas.html
   * @param categoria: recibe la categoría que elige el usuario
   */
  pasarCategoria(categoria: string) {
    setTimeout(() => {
      this._pasarCategoria.mandarCategoria.emit(categoria);
      this.categoria = categoria;
    }, 200);
  }
/**
 * @description método para buscar una receta desde el buscador, al pulsar el botón de buscar
 */
  pasarReceta() {
    var nombre = '';
    var cuerpo = '';
    var primeraLetra = '';
    var array = [''];
    /**
     * @description pone la primera letra en mayúscula debido a que los títulos siempre empiezan por mayúscula
     */
    primeraLetra = (<HTMLInputElement>(
      document.getElementById('buscar-receta')
    ))!.value
      .charAt(0)
      .toUpperCase();
    /**el resto será en minúscula */ 
    cuerpo = (<HTMLInputElement>document.getElementById('buscar-receta'))!.value
      .substring(1)
      .toLocaleLowerCase();
    /* recorre la colección recetas para buscar si alguna receta contiene la palabra/letras que busca el usuario */  
    this.recetas.subscribe((receta) => {
      for (let i = 0; i < receta.length; i++) {
        array[i] = receta[i].nombre;
        if (array[i].includes(primeraLetra.toLowerCase() + cuerpo)) {
          primeraLetra = (<HTMLInputElement>(
            document.getElementById('buscar-receta')
          ))!.value
            .charAt(0)
            .toLowerCase();
          nombre = primeraLetra + cuerpo;
          nombre.toLowerCase();
        }
      }
    });

    nombre = primeraLetra + cuerpo;

    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(nombre);
    }, 200);
  }

  /**
   * @description método para buscar una receta desde el buscador, al pulsar  la tecla enter
   * @param e: evento al pulsar una tecla (keyup) 
   */
  buscar(e: KeyboardEventInit) {
    var nombre = '';
    var cuerpo = '';
    var primeraLetra = '';
    var array = [''];
     /**comprueba que se ha pulsado la tecla enter */
    if (e.key == 'Enter') {
      primeraLetra = (<HTMLInputElement>(
        document.getElementById('buscar-receta')
      ))!.value
        .charAt(0)
        .toUpperCase();
      cuerpo = (<HTMLInputElement>(
        document.getElementById('buscar-receta')
      ))!.value
        .substring(1)
        .toLocaleLowerCase();
      this.route.navigate(['/buscarReceta']);
      this.recetas.subscribe((receta) => {
        for (let i = 0; i < receta.length; i++) {
          array[i] = receta[i].nombre;
          if (array[i].includes(primeraLetra.toLowerCase() + cuerpo)) {
            primeraLetra = (<HTMLInputElement>(
              document.getElementById('buscar-receta')
            ))!.value
              .charAt(0)
              .toLowerCase();
            nombre = primeraLetra + cuerpo;
            nombre.toLowerCase();
          }
        }
      });
      nombre = primeraLetra + cuerpo;

      setTimeout(() => {
        this._pasarReceta.mandarReceta.emit(nombre);
      }, 200);
    }
  }
}
