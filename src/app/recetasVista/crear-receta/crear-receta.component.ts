import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { GuardarUsuarioService } from 'src/app/services/guardar-usuario.service';

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
    private _recibirCorreoUsuario: GuardarUsuarioService
  ) {
    this.quitar = _CargaScripts.quitarCabFoot();
    _CargaScripts.carga(["js/javaScript"]);
    _CargaScripts.carga(["js/javaScriptQuitar"]);
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        /*La exclamación es para indicar que estamos seguros de que no es null*/
        this.correo = user.email!;
      }
    });
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
    inputNuevoIngrediente.setAttribute('placeholder','ingrediente ' + this.numIngrediente);
    inputNuevoIngrediente.setAttribute('id','ingrediente' + this.numIngrediente);
    /**crea los input de las cantidades */
    let inputNuevaCantidad = document.createElement('input');
    inputNuevaCantidad.setAttribute('class', 'form-control ingrediente-input input-crear-receta');
    inputNuevaCantidad.setAttribute('id', 'cantidad' + this.numIngrediente);
    inputNuevaCantidad.setAttribute(
      'placeholder',
      'Cantidad ' + this.numIngrediente
    );
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
    
    this._CargaScripts.carga(["js/javaScriptQuitar"]);
  }

  aniadirPaso() {
    this._CargaScripts.carga(["js/javaScript"]);
    let nuevoPaso = document.createElement('div');
    nuevoPaso.setAttribute('class', 'paso form-group');

    let texto = document.createTextNode('Paso ' + this.numPaso + ': ');
    nuevoPaso.appendChild(texto);

    let inputNuevoPaso = document.createElement('input');
    inputNuevoPaso.setAttribute('id', 'paso' + this.numPaso);
    inputNuevoPaso.setAttribute('class', 'form-control form-group input-crear-receta');

    nuevoPaso.appendChild(inputNuevoPaso)

    let divImg= document.createElement('div');
    divImg.setAttribute('class','custom-file mb-3')
    nuevoPaso.appendChild(divImg)

    let inputNuevaImagen = document.createElement('input');
    inputNuevaImagen.setAttribute('id', 'imagen' + this.numPaso);
    inputNuevaImagen.setAttribute('type', 'file');
    inputNuevaImagen.setAttribute('class', 'custom-file-input');
    inputNuevaImagen.setAttribute('name', 'filename');
    divImg.appendChild(inputNuevaImagen)

    let labelNuevaImg = document.createElement('label');
    labelNuevaImg.setAttribute('class','custom-file-label input-crear-receta')
    labelNuevaImg.setAttribute("data-content","Seleccionar")
    labelNuevaImg.innerHTML="Seleccione un archivo";

    divImg.appendChild(labelNuevaImg)
 

    /*Mirar cómo añadir texto2 aquí y en la imagen de los pasos.
    let texto2=document.createTextNode("Imagen: ");
    divImg.appendChild(inputNuevaImagen);
    nuevoPaso.appendChild(inputNuevaImagen);*/

    let pasos = document.getElementById('pasos');
    pasos!.appendChild(nuevoPaso);

    this.numPaso++;
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
    console.log(this.comensales);
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
      }
    }

    /*Cantidades vacías*/
    for (let i = 0; i < ingredientes.length; i++) {
      if ((<HTMLInputElement>ingredientes[i].children[1]).value == '') {
        console.log('vacía cantidad ' + i);
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
    /*Contar las recetas que hay para asignar un id a la nueva receta. Y lo mismo con ingredientes y pasos.
    var recetas = this.firestore.collection('recetas').valueChanges();
    var idReceta=0;
    recetas.forEach(receta => {
      idReceta++;
    });
    console.log(idReceta);*/
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
    for (let i = 0; i < this.numIngrediente - 1; i++) {
      this.nombreIngrediente = (<HTMLInputElement>(
        ingredientes[i].children[0]
      )).value;
      this.cantidad = (<HTMLInputElement>ingredientes[i].children[1]).value;
      this.firestore
        .collection('ingredientes')
        .add({
          id: this.idIngrediente,
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
      this.descripcion = (<HTMLInputElement>pasos[i].children[0]).value;
      this.firestore
        .collection('pasos')
        .add({
          id: this.idPaso,
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
