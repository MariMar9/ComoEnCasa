import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetasService } from '../../../core/services/recetas.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/core/services/cargar-scripts.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.component.html',
  styleUrls: ['./mostrar-receta.component.css'],
})
export class MostrarRecetaComponent implements OnInit {
  /**variables */
  recetas: Observable<any[]>;
  ingredientes: Observable<any[]>;
  comentarios: Observable<any[]>;
  pasos: Observable<any[]>;
  idReceta: number = 0;
  nomReceta: string = 's';
  emailUsuario: string="";

  usuarioConectado = false;

  constructor(
    private _pasarReceta: RecetasService,
    public firestore: AngularFirestore,
    private router: Router,
    private _pasarNomReceta: RecetasService,
    private _consultarColeccion: RecetasService,
    private _CargaScripts: CargarScriptsService,
    public firebaseAuth: AngularFireAuth
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
/**
 * @description accede al método crear comentario, para poder mostrarlo en el html al pulsar el botón
 */
  publicarComentario() {
    this.crearComentario();
  }
 
  /**
   * @description crea un comentario 
   */
  crearComentario() {
    let nombreUsuario = '';
    let mensajeUsuario = '';
    let fallo = <HTMLElement>document.querySelector('.falloComentario');
    let correcto = false;
    let correctoNR = false;
    /**si el usuario esta conectado muestra el nombre del perfil */
    if (this.usuarioConectado == true) {
      if (localStorage.getItem('usuarioGoogle') != null) {
        let usuarioGoogle = JSON.parse(localStorage.usuarioGoogle);
        nombreUsuario = usuarioGoogle.displayName;
        mensajeUsuario = (<HTMLInputElement>document.querySelector('#mensaje'))
          .value;
        fallo.innerHTML = 'Escriba un mensaje por favor';
        correcto = true;
       /**si no muestra el nombre que introduzca el usuario */ 
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
      /**si el usuario no esta registrado debe introducir un nombre */
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
    
    /**muestra la imagen por defecto o la del perfil de usuario si se ha cmbiado la imagen */
    if (correcto == true || correctoNR==true) {
      if (localStorage.usuario != null || localStorage.usuarioGoogle != null) {
        let imagenUsuario="";
        this.firebaseAuth.onAuthStateChanged((user) => {
          if (user) {
            imagenUsuario = user.photoURL!;
          }
        })
        .then(()=>{
          this.firestore.collection('comentarios').add({
            idReceta: this.idReceta,
            nombre: nombreUsuario,
            mensaje: mensajeUsuario,
            imagenUsuario: imagenUsuario,
            fecha: new Date(),
          });
        });
      }else{
        this.firestore.collection('comentarios').add({
          idReceta: this.idReceta,
          nombre: nombreUsuario,
          mensaje: mensajeUsuario,
          fecha: new Date(),
        });
      }
    }
  }
}
