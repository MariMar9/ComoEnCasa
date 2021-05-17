import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';
import { RecetasService } from '../services/recetas.service';
import {Router} from '@angular/router'; 

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
  recetas: Observable<any[]>;
  constructor(
    public firestore: AngularFirestore,
    private _CargaScripts: CargarScriptsService,
    private _pasarCategoria: RecetasService,
    private _pasarReceta: RecetasService,
    private route:Router
  ) {
    this.quitar = _CargaScripts.quitarCabFoot();
    this.usuarioConectado = _CargaScripts.conectado();
    this.recetas = this._pasarReceta.getCollectionRecetas<any>('/recetas','id')

  }

  ngOnInit(): void {}

  pasarCategoria(categoria: string) {
    setTimeout(() => {
      this._pasarCategoria.mandarCategoria.emit(categoria);
      this.categoria = categoria;
    }, 200);
  }

  pasarReceta() {
    var nombre = '';
    var cuerpo = '';
    var primeraLetra = '';
    var array = ['']
    primeraLetra =(<HTMLInputElement>document.getElementById('buscar-receta'))!.value.charAt(0).toUpperCase()
    cuerpo = (<HTMLInputElement>document.getElementById('buscar-receta'))!.value.substring(1).toLocaleLowerCase();
    this.recetas.subscribe((receta)=>{
      for (let i = 0; i < receta.length; i++) {
       array [i]= receta[i].nombre
       if(array[i].includes(primeraLetra.toLowerCase()+cuerpo)){
          primeraLetra =(<HTMLInputElement>document.getElementById('buscar-receta'))!.value.charAt(0).toLowerCase()
          nombre =primeraLetra+cuerpo
          nombre.toLowerCase() 
       }
      }  
    })
    nombre=primeraLetra+cuerpo

    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(nombre);
    }, 200);
  }

  buscar(e: KeyboardEventInit) {
    var nombre = '';
    var cuerpo = '';
    var primeraLetra = '';
    var array = ['']
    if(e.key=="Enter"){

      primeraLetra =(<HTMLInputElement>document.getElementById('buscar-receta'))!.value.charAt(0).toUpperCase()
      cuerpo = (<HTMLInputElement>document.getElementById('buscar-receta'))!.value.substring(1).toLocaleLowerCase();
      this.route.navigate(['/buscarReceta'])
      this.recetas.subscribe((receta)=>{
        for (let i = 0; i < receta.length; i++) {
         array [i]= receta[i].nombre
         if(array[i].includes(primeraLetra.toLowerCase()+cuerpo)){
            primeraLetra =(<HTMLInputElement>document.getElementById('buscar-receta'))!.value.charAt(0).toLowerCase()
            nombre =primeraLetra+cuerpo
            nombre.toLowerCase() 
         }
        }  
      })
      nombre=primeraLetra+cuerpo
    }
   
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(nombre);
    }, 200);
  }
}
