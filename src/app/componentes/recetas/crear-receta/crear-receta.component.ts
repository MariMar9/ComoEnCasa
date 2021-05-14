import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/core/services/cargar-scripts.service';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css'],
})
export class CrearRecetaComponent implements OnInit {
  usuarioConectado: boolean = false;
  quitar: boolean = false;
  correo: string = '';
  numIngrediente: number = 2;
  numPaso: number = 2;
  recetas: Observable<any[]>;
  
  /*Variables de las recetas*/
  /*imagenReceta: File=new File(["foo"], "foo.txt", {
    type: "text/plain",
  });*/
  idReceta: number = 0;
  nombreReceta: string = '';
  categoria: string = 'Seleccione una categoría';
  comensales: number = 0;
  dificultad: string = 'Dificultad';
  duracion: string = '';

  /*Variables de los ingredientes*/
  idIngrediente: number = 0;
  nombreIngrediente: string = '';
  cantidad: string = '';

  /*Variables de los pasos*/
  idPaso: number = 0;
  descripcion: string = '';
  /*imagenPaso: File=new File(["foo"], "foo.txt", {
    type: "text/plain",
  });*/
/**ejecutar script */
cargaInput: string=''
  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private _CargaScripts: CargarScriptsService,
    private _consultarColeccion: RecetasService
  ) {
    this.quitar = _CargaScripts.quitarCabFoot();
    this._CargaScripts.carga(['js/javaScript'])
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        /*La exclamación es para indicar que estamos seguros de que no es null*/
        this.correo = user.email!;
      }
    });
    const path = 'recetas/';
    this.recetas = this._consultarColeccion.getCollectionRecetas<any>(path,'id');
    this.recetas.forEach((recetas)=>{
      this.idReceta=(recetas.length)+1;
    })
  }
  
  ngOnInit(): void {}

  aniadirIngrediente() {
    /**crea el contenedor de los ingredientes */
    let nuevoIngrediente = document.createElement('div');

    nuevoIngrediente.setAttribute(
      'style',
      'display:flex;justify-content: space-between;'
    );
    nuevoIngrediente.setAttribute('class', 'ingrediente form-group');

    /**crea los input de los ingredientes*/
    let inputNuevoIngrediente = document.createElement('input');
    inputNuevoIngrediente.setAttribute('class','form-control ingrediente-input input-crear-receta');
    inputNuevoIngrediente.setAttribute('placeholder','Nuevo ingrediente');
    inputNuevoIngrediente.setAttribute('id','ingrediente' + this.numIngrediente);
    /**crea los input de las cantidades */
    let inputNuevaCantidad = document.createElement('input');
    inputNuevaCantidad.setAttribute('class', 'form-control ingrediente-input input-crear-receta');
    inputNuevaCantidad.setAttribute('id', 'cantidad' + this.numIngrediente);
    inputNuevaCantidad.setAttribute('placeholder','Nueva cantidad');
    let botonQuitarIngrediente = document.createElement('button');
    botonQuitarIngrediente.setAttribute('class', 'btn btn-secondary quitarIngredienteCantidad');
    let botonQuitarIngredienteIcono = document.createElement('i');
    botonQuitarIngredienteIcono.setAttribute('class', 'fas fa-times');
    botonQuitarIngrediente.appendChild(botonQuitarIngredienteIcono)

    nuevoIngrediente.appendChild(inputNuevoIngrediente);
    nuevoIngrediente.appendChild(inputNuevaCantidad);
    nuevoIngrediente.appendChild(botonQuitarIngrediente);

    let ingredientes = document.getElementById('ingredientes');
    ingredientes!.appendChild(nuevoIngrediente);
    this.numIngrediente++;
    
    botonQuitarIngrediente.addEventListener('click', this.quitarIngrediente);
  }

  quitarIngrediente(e: Event) {
    if(((<HTMLButtonElement>e.target)!=null)){
      if((<HTMLButtonElement>e.target).parentElement?.className=="ingrediente form-group"){
        (<HTMLButtonElement>e.target).parentElement?.remove()
      }else if((<HTMLButtonElement>e.target).parentElement?.className=="btn btn-secondary quitarIngredienteCantidad"){
        ((<HTMLButtonElement>e.target).parentElement)?.parentElement?.remove()
      }
    }
  }

  aniadirPaso() {
    let contenedorPaso= (<HTMLDivElement>document.querySelector('#pasos'))
   
    let nuevoPaso = document.createElement('div');
    nuevoPaso.setAttribute('class', 'paso form-group d-flex align-items-center');

    let grupoPaso = document.createElement('div');
    grupoPaso.setAttribute('class','d-inline-flex flex-column w-100');
    
    let texto = document.createTextNode('Paso ' + this.numPaso + ': ');
    contenedorPaso.appendChild(texto);

    let inputNuevoPaso = document.createElement('input');
    inputNuevoPaso.setAttribute('id', 'paso' + this.numPaso);
    inputNuevoPaso.setAttribute('class', 'form-control form-group input-crear-receta');

    /*let grupoParaInputImg = document.createElement('div')
    grupoParaInputImg.setAttribute('class','custom-file mb-3');

    nuevoPaso.appendChild(inputNuevoPaso)*/

    let grupoParaInputImg= document.createElement('div');
    grupoParaInputImg.setAttribute('class','custom-file mb-3')
 

    let inputNuevaImagen = document.createElement('input');
    inputNuevaImagen.setAttribute('id', 'imagen' + this.numPaso);
    inputNuevaImagen.setAttribute('type', 'file');
    inputNuevaImagen.setAttribute('class', 'custom-file-input');
    inputNuevaImagen.setAttribute('name', 'filename');


    let labelNuevaImg = document.createElement('label');
    labelNuevaImg.setAttribute('class','custom-file-label input-crear-receta')
    labelNuevaImg.setAttribute('data-content','Abrir')
    labelNuevaImg.innerHTML="Seleccione un archivo";

    let botonImg = document.createElement('button');
    botonImg.setAttribute('class',"btn btn-secondary noQuitarIngredienteCantidad ml-4") 

    let iconoBoton = document.createElement('i');
    iconoBoton.setAttribute('class','fas fa-times');
    botonImg.appendChild(iconoBoton);
    
    contenedorPaso.appendChild(nuevoPaso);
    nuevoPaso.appendChild(grupoPaso);
    nuevoPaso.appendChild(botonImg);
    grupoPaso.appendChild(inputNuevoPaso);
    grupoPaso.appendChild(grupoParaInputImg);
    grupoParaInputImg.appendChild(inputNuevaImagen);
    grupoParaInputImg.appendChild(labelNuevaImg);

    /*Mirar cómo añadir texto2 aquí y en la imagen de los pasos.
    let texto2=document.createTextNode("Imagen: ");
    divImg.appendChild(inputNuevaImagen);
    nuevoPaso.appendChild(inputNuevaImagen);*/

    let pasos = document.getElementById('pasos');
    pasos!.appendChild(nuevoPaso);

    this.numPaso++;

    this._CargaScripts.carga(['js/javaScript']);
    (<HTMLScriptElement>document.querySelector('script[src="../assets/js/javaScript.js"]')).remove()
  }

  validarDatos() {
    let correcto = true;
    if (this.nombreReceta == '') {
      console.log('Falta nombre');
      correcto = false;
    }
    if (this.categoria == 'Seleccione una categoría') {
      console.log('Falta categoría');
      correcto = false;
    }
    if (this.comensales <= 0 || this.comensales == null) {
      console.log('Falta comensales');
      correcto = false;
    }
    if (this.dificultad == 'Dificultad') {
      console.log('Falta dificultad');
      correcto = false;
    }
    if (this.duracion == '') {
      console.log('Falta duracion');
      correcto = false;
    }

    /*Ingredientes vacíos*/
    var ingredientes = document.getElementsByClassName('ingrediente');
    for (let i = 0; i < ingredientes.length; i++) {
      if ((<HTMLInputElement>ingredientes[i].children[0]).value == '') {
        console.log('vacío ingrediente ' + i);
        correcto = false;
      }
    }

    /*Cantidades vacías*/
    for (let i = 0; i < ingredientes.length; i++) {
      if ((<HTMLInputElement>ingredientes[i].children[1]).value == '') {
        console.log('vacía cantidad ' + i);
        correcto = false;
      }
    }

    /*Pasos vacíos*/
    var pasos = document.getElementsByClassName('paso');
    for (let i = 0; i < pasos.length; i++) {
      if ((<HTMLInputElement>pasos[i].children[0]).value == '') {
        console.log('vacío paso ' + i);
      }
    }

    if (correcto) {
      this.aniadirReceta();
    }
  }

  aniadirReceta() {
    /*Añadir la nueva receta a firebase*/
    this.firestore
      .collection('recetas')
      .add({
        id: this.idReceta,
        correo_usuario: this.correo,
        nombre: this.nombreReceta,
        categoria: this.categoria,
        comensales: this.comensales,
        dificultad: this.dificultad,
        duracion: this.duracion,
        fecha: new Date(),
      })
      .then((recetaCreada) => {
        console.log('Se ha creado la receta.');
      })
      .catch((error) => {
        console.error('Se ha producido un error al crear la receta.');
      });

    /*Añadir los nuevos ingredientes a firebase*/
    var ingredientes = document.getElementsByClassName('ingrediente');
    for (let i = 0; i < ingredientes.length; i++) {
      this.nombreIngrediente = (<HTMLInputElement>(
        ingredientes[i].children[0]
      )).value;
      this.cantidad = (<HTMLInputElement>ingredientes[i].children[1]).value;
      this.firestore
        .collection('ingredientes')
        .add({
          id: i+1,
          nombre: this.nombreIngrediente,
          cantidad: this.cantidad,
          idReceta: this.idReceta,
        })
        .then((ingredienteCreado) => {
          console.log('Se ha creado el ingrediente.');
        })
        .catch((error) => {
          console.error('Se ha producido un error al crear el ingrediente.');
        });
    }

    /*Añadir los nuevos pasos a firebase*/
    var pasos = document.getElementsByClassName('paso');
    for (let i = 0; i < this.numPaso - 1; i++) {
      this.descripcion = (<HTMLInputElement>pasos[i].children[0].children[0]).value;
      this.firestore
        .collection('pasos')
        .add({
          id: i+1,
          descripcion: this.descripcion,
          idReceta: this.idReceta,
        })
        .then((pasoCreado) => {
          console.log('Se ha creado el paso.');
        })
        .catch((error) => {
          console.error('Se ha producido un error al crear el paso.');
        });
    }
  }
}
