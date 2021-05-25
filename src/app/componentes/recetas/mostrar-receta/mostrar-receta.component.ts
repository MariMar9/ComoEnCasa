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
    this.comentarios =
      this._consultarColeccion.getcomentarios<any>('comentarios/','fecha');

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
    console.log('comentario publicado');
    this.crearComentario();
  }

  crearComentario() {
    let nombreUsuario = '';
    let mensajeUsuario = (<HTMLInputElement>document.querySelector('#mensaje')).value;
    console.log(nombreUsuario);
    if (this.usuarioConectado == true) {
      if (localStorage.getItem('usuarioGoogle') != null) {
        let usuarioGoogle = JSON.parse(localStorage.usuarioGoogle);
        nombreUsuario = usuarioGoogle.displayName;
      }else if(localStorage.getItem('usuario') != null){
         let usuarioMail = JSON.parse(localStorage.usuario);
         nombreUsuario = usuarioMail.displayName;
      }
      let fallo = <HTMLElement>document.querySelector('.falloComentario');
        fallo.innerHTML = 'Escriba un mensaje por favor';
    } else {
      nombreUsuario = (<HTMLInputElement>document.querySelector('#nombre')).value;
      if(nombreUsuario="" && mensajeUsuario==""){
        let fallo = <HTMLElement>document.querySelector('.falloComentario');
        fallo.innerHTML = 'Debe rellenar todos los campos';
      }
    }

   this.firestore.collection('comentarios').add({
      idReceta: this.idReceta,
      nombre: nombreUsuario,
      mensaje: mensajeUsuario,
      fecha: new Date(),
    });
  }
}



