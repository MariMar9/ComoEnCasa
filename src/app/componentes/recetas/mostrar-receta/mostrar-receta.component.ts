import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetasService } from '../../../core/services/recetas.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/core/services/cargar-scripts.service';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.component.html',
  styleUrls: ['./mostrar-receta.component.css'],
})
export class MostrarRecetaComponent implements OnInit {
  recetas: Observable<any[]>;
  ingredientes: Observable<any[]>;
  comentarios: Observable<any[]>;
  pasos: Observable<any[]>;
  idReceta: number = 0;
  nomReceta: string = 's';

  usuarioConectado = false;

  constructor(
    private _pasarReceta: RecetasService,
    public firestore: AngularFirestore,
    private router: Router,
    private _pasarNomReceta: RecetasService,
    private _consultarColeccion: RecetasService,
    private _CargaScripts: CargarScriptsService
  ) {
    const path = 'pasos/';
    this.recetas = this._consultarColeccion.getCollection<any>('recetas/');
    this.ingredientes = this._consultarColeccion.getCollectionRecetas<any>(
      'ingredientes/',
      'id'
    );
    this.pasos = this._consultarColeccion.getCollectionRecetas<any>(path, 'id');
    this.comentarios = this._consultarColeccion.getcomentarios<any>(
      'comentarios/',
      'fecha'
    );

    /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarReceta.mandarReceta.subscribe((idReceta) => {
      this.idReceta = idReceta;
    });
    this.usuarioConectado = _CargaScripts.conectado();
    setTimeout(() => {
      if (this.idReceta == 0 && this.nomReceta == 's') {
        this.router.navigate(['/recetas']);
      }
    }, 300);
  }

  ngOnInit(): void {}

  publicarComentario() {
    this.crearComentario();
  }

  crearComentario() {
    let nombreUsuario = '';
    let mensajeUsuario = '';
    let fallo = <HTMLElement>document.querySelector('.falloComentario');
    let correcto = false;
    let correctoNR = false;
    if (this.usuarioConectado == true) {
      if (localStorage.getItem('usuarioGoogle') != null) {
        let usuarioGoogle = JSON.parse(localStorage.usuarioGoogle);
        nombreUsuario = usuarioGoogle.displayName;
        mensajeUsuario = (<HTMLInputElement>document.querySelector('#mensaje'))
          .value;
        fallo.innerHTML = 'Escriba un mensaje por favor';
        correcto = true;
      } else if (localStorage.getItem('usuario') != null) {
        let usuarioMail = JSON.parse(localStorage.usuario);
        nombreUsuario = usuarioMail.displayName;
        mensajeUsuario = (<HTMLInputElement>document.querySelector('#mensaje'))
          .value;
        fallo.innerHTML = 'Escriba un mensaje por favor';
        correcto = true;
      }
      if (mensajeUsuario == '') {
        fallo.innerHTML = 'Escriba un mensaje por favor';
        correcto = false;
      }else{
        fallo.innerHTML = '';
      }
    } else if (this.usuarioConectado == false) {
      

        nombreUsuario = (<HTMLInputElement>document.querySelector('#nombre'))
          .value;
        mensajeUsuario = (<HTMLInputElement>document.querySelector('#mensaje'))
          .value;
          if(nombreUsuario==""){
            fallo.innerHTML = 'Introduzca su nombre';
          }else if(mensajeUsuario==""){
            fallo.innerHTML = 'Ponga un comentario';
          }else{
            correctoNR = true;
          }
    } 
    
    if (correcto == true || correctoNR==true) {
      console.log('hecho');
      this.firestore.collection('comentarios').add({
        idReceta: this.idReceta,
        nombre: nombreUsuario,
        mensaje: mensajeUsuario,
        fecha: new Date(),
      });
    }
  }
}
