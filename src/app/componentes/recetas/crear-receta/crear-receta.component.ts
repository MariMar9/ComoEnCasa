import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/core/services/cargar-scripts.service';
import { EMPTY, Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { UploadFileService } from '../upload/upload-file.service';
import { FileUpload } from '../upload/file-upload';
import { isEmpty } from 'rxjs/operators';

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
  imagenesPasos: string[]=[];

  /*Variables de las imágenes*/
  numImagenes: number=0;
  selectedFile: FileList=null!;
  currentFileUpload: FileUpload=new FileUpload(new File(["foo"], "foo.txt", {type: "text/plain"}));
  tmp_file: File=new File(["foo"], "foo.txt", {type: "text/plain"});
  tmp_files: File[]=new Array(new File(["foo"], "foo.txt", {type: "text/plain"}));

/**ejecutar script */
  cargaInput: string='';

  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private _CargaScripts: CargarScriptsService,
    private _consultarColeccion: RecetasService,
    private uploadService: UploadFileService
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
    });
  }
  
  ngOnInit(): void {}

  aniadirIngrediente() {
    /**crea el contenedor de los ingredientes */
    let nuevoIngrediente = document.createElement('div');
    nuevoIngrediente.setAttribute('class', 'ingrediente form-group');

    /**primer grupo de los ingredientes */
    let grupoInput = document.createElement('div');
    grupoInput.setAttribute('class', 'row w-100 justify-content-center');
    /**crea el row */
    let grupoInputRow = document.createElement('div');
    grupoInputRow.setAttribute('class', 'row w-100 justify-content-center');
    /**div anterior al input de ingrediente */
    let divIngrediente = document.createElement('div');
    divIngrediente.setAttribute('class', 'col-10 col-md-6 col-lg-6');
    /**crea los input de los ingredientes*/
    let inputNuevoIngrediente = document.createElement('input');
    inputNuevoIngrediente.setAttribute('class','form-control ingrediente-input input-crear-receta w-100');
    inputNuevoIngrediente.setAttribute('maxlength','30');
    inputNuevoIngrediente.setAttribute('placeholder','Nuevo ingrediente');
    inputNuevoIngrediente.setAttribute('id','ingrediente' + this.numIngrediente);

    /**div anterior al input de cantidad*/
    let divCantidad = document.createElement('div');
    divCantidad.setAttribute('class', 'col-10 col-md-6 col-lg-6');
    /**crea los input de las cantidades */
    let inputNuevaCantidad = document.createElement('input');
    inputNuevaCantidad.setAttribute('class', 'form-control ingrediente-input input-crear-receta w-100');
    inputNuevaCantidad.setAttribute('maxlength','20');
    inputNuevaCantidad.setAttribute('id', 'cantidad' + this.numIngrediente);
    inputNuevaCantidad.setAttribute('placeholder','Nueva cantidad');
    /**crea los campos de los fallos */
    let falloIngredienteDiv=document.createElement('div');
    let falloIngredienteP=document.createElement('p');
    falloIngredienteP.setAttribute('class', 'faltaIngrediente');
    let ingredienteTexto =falloIngredienteDiv.appendChild(falloIngredienteP);
    let falloCantidadDiv=document.createElement('div');
    let falloCantidadP=document.createElement('p');
    falloCantidadP.setAttribute('class', 'faltaCantidad');
    let cantidadTexto =falloCantidadDiv.appendChild(falloCantidadP);
    
    /**crea los botones */
    let botonQuitarIngrediente = document.createElement('button');
    botonQuitarIngrediente.setAttribute('class', 'btn btn-secondary quitarIngredienteCantidad  ml-4 mb-3');
    let botonQuitarIngredienteIcono = document.createElement('i');
    botonQuitarIngredienteIcono.setAttribute('class', 'fas fa-times');
    botonQuitarIngrediente.appendChild(botonQuitarIngredienteIcono)

    grupoInputRow.appendChild(grupoInput)
    grupoInput.appendChild(divIngrediente)
    grupoInput.appendChild(divCantidad)
    divIngrediente.appendChild(inputNuevoIngrediente);
    divCantidad.appendChild(inputNuevaCantidad);
    divIngrediente.appendChild(ingredienteTexto);
    divCantidad.appendChild(cantidadTexto);
    nuevoIngrediente.appendChild(grupoInput);
    nuevoIngrediente.appendChild(botonQuitarIngrediente);

    /*nuevoIngrediente.appendChild(inputNuevoIngrediente);
    nuevoIngrediente.appendChild(inputNuevaCantidad);
    nuevoIngrediente.appendChild(botonQuitarIngrediente);*/

    /**textos para los errores de los ingredientes */
    

    let ingredientes = document.getElementById('ingredientes');
    ingredientes!.appendChild(nuevoIngrediente);
    this.numIngrediente++;
    
    botonQuitarIngrediente.addEventListener('click', this.quitarIngrediente);
  }

  quitarIngrediente(e: Event) {
    if(((<HTMLButtonElement>e.target)!=null)){
      if((<HTMLButtonElement>e.target).parentElement?.className=="ingrediente form-group"){
        (<HTMLButtonElement>e.target).parentElement?.remove()
      }else if((<HTMLButtonElement>e.target).parentElement?.className=="btn btn-secondary quitarIngredienteCantidad  ml-4 mb-3"){
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
    grupoPaso.appendChild(texto);

    let inputNuevoPaso = document.createElement('input');
    inputNuevoPaso.setAttribute('id', 'paso' + this.numPaso);
    inputNuevoPaso.setAttribute('class', 'form-control form-group input-crear-receta');
    inputNuevoPaso.setAttribute('maxlength','200');

    let falloPaso = document.createElement('p');
    falloPaso.setAttribute('class','faltaPaso');

    /*let grupoParaInputImg = document.createElement('div')
    grupoParaInputImg.setAttribute('class','custom-file mb-3');

    nuevoPaso.appendChild(inputNuevoPaso)*/

    let grupoParaInputImg= document.createElement('div');
    grupoParaInputImg.setAttribute('class','custom-file mb-3')

    let inputNuevaImagen = document.createElement('input');
    inputNuevaImagen.setAttribute('id', 'imagen' + (this.numPaso));
    inputNuevaImagen.setAttribute('type', 'file');
    inputNuevaImagen.setAttribute('class', 'custom-file-input imagen');
    inputNuevaImagen.setAttribute('name', 'filename');

    let labelNuevaImg = document.createElement('label');
    labelNuevaImg.setAttribute('class','custom-file-label input-crear-receta')
    labelNuevaImg.setAttribute('data-content','Abrir')
    labelNuevaImg.innerHTML="Seleccione un archivo";

    let botonImg = document.createElement('button');
    botonImg.setAttribute('class',"btn btn-secondary quitarPaso ml-4") 

    let iconoBoton = document.createElement('i');
    iconoBoton.setAttribute('class','fas fa-times');
    botonImg.appendChild(iconoBoton);
    
    contenedorPaso.appendChild(nuevoPaso);
    nuevoPaso.appendChild(grupoPaso);
    nuevoPaso.appendChild(botonImg);
    grupoPaso.appendChild(inputNuevoPaso);
    grupoPaso.appendChild(falloPaso);
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

    botonImg.addEventListener('click', this.quitarPaso);
    inputNuevaImagen.addEventListener('change', (event) => {
      this.fileChange(event);
    });

    this._CargaScripts.carga(['js/javaScript']);
    (<HTMLScriptElement>document.querySelector('script[src="../assets/js/javaScript.js"]')).remove()
  }

  quitarPaso(e: Event) {
    var elemento=((<HTMLButtonElement>e.target).parentElement);
    if(((<HTMLButtonElement>e.target)!=null)){
      if(((<HTMLButtonElement>e.target).parentElement)?.parentElement?.className=="paso form-group d-flex align-items-center"){
        ((<HTMLButtonElement>e.target).parentElement)?.parentElement?.remove()
      }else if((<HTMLButtonElement>e.target).className=="btn btn-secondary quitarPaso ml-4"){
        ((<HTMLButtonElement>e.target).parentElement)?.remove()
      }
    }
  }
  
  validarDatos() {
    let correcto = true;
    if (this.tmp_files[0]) {
      console.log("imagen principal vacia")
      document.getElementById("faltaImagen")!.innerText="Falta imagen.";
      //correcto = false;
    }else{
      document.getElementById("faltaImagen")!.innerText="";
    }
    if (this.nombreReceta == '') {
      console.log("nombre vacios")
      document.getElementById("faltaNombre")!.innerText="Falta nombre.";
      correcto = false;
    }else{
     var primeraLetra =(<HTMLInputElement>document.getElementById('nombre')).value.charAt(0).toUpperCase()
      this.nombreReceta = primeraLetra +(<HTMLInputElement>document.getElementById('nombre')).value.substring(1).toLocaleLowerCase();
      document.getElementById("faltaNombre")!.innerText="";
    }
    if (this.categoria == 'Seleccione una categoría') {
      console.log("categoria vacios")
      document.getElementById("faltaCategoria")!.innerText="Falta categoría.";
      correcto = false;
    }else{
      document.getElementById("faltaCategoria")!.innerText="";
    }
    if (!Number.isInteger(this.comensales)) {
      document.getElementById("faltaComensales")!.innerText="Debe introducir un número.";
      correcto = false;
    }else if (this.comensales < 1 || this.comensales > 50){
      document.getElementById("faltaComensales")!.innerText="Debe introducir un número entre el 1 y el 50.";
      correcto = false;
    }else if (this.comensales == null){
      document.getElementById("faltaComensales")!.innerText="Falta comensales.";
      correcto = false;
    }else{
      document.getElementById("faltaComensales")!.innerText="";
    }
    if (this.dificultad == 'Dificultad') {
      console.log("dificultad vacios")
      document.getElementById("faltaDificultad")!.innerText="Falta dificultad.";
      correcto = false;
    }else{
      document.getElementById("faltaDificultad")!.innerText="";
    }
    if (this.duracion == '') {
      console.log("catiduracion vacios")
      document.getElementById("faltaDuracion")!.innerText="Falta duración.";
      correcto = false;
    }else{
      document.getElementById("faltaDuracion")!.innerText="";
    }

    /*Ingredientes vacíos*/
    var ingredientes = document.getElementsByClassName('ingrediente');
    
    for (let i = 0; i < ingredientes.length; i++) {
      
      if ((<HTMLInputElement>ingredientes[i].children[0].children[0].childNodes[0]).value == '') {
        (<HTMLInputElement>document.getElementsByClassName("faltaIngrediente")[i]).innerText = 'Falta ingrediente.';
        correcto = false;
      }else{
        var primeraLetra =(<HTMLInputElement>document.getElementById('nombre')).value.charAt(0).toUpperCase()
        this.nombreIngrediente = primeraLetra +(<HTMLInputElement>document.getElementById('nombre')).value.substring(1).toLocaleLowerCase();
        (<HTMLInputElement>document.getElementsByClassName("faltaIngrediente")[i]).innerText = '';
      }
    }

    /*Cantidades vacías*/
    for (let i = 0; i < ingredientes.length; i++) {
      
      if ((<HTMLInputElement>ingredientes[i].children[0].children[1].childNodes[0]).value == '') {
        (<HTMLInputElement>document.getElementsByClassName("faltaCantidad")[i]).innerText = 'Falta cantidad.';
        correcto = false;
      }else{
        (<HTMLInputElement>document.getElementsByClassName("faltaCantidad")[i]).innerText = '';
      }
    }

    /*Pasos vacíos*/
    var pasos = document.getElementsByClassName('paso');
    for (let i = 0; i < pasos.length; i++) {
     
      document.getElementsByClassName('paso')[0].children[0].children[0]
      if ((((<HTMLInputElement>(pasos[i].children[0]).children[0]))).value == '') { 
        console.log("pasos vacios");
        /*document.querySelectorAll<HTMLElement>(".faltaPaso").forEach((paso)=>{
          paso.innerText="Falta el paso"
        });*/
        (<HTMLInputElement>document.getElementsByClassName("faltaPaso")[i]).innerText = 'Falta paso.';
        correcto = false;
      }else{
        /*document.querySelectorAll<HTMLElement>(".faltaPaso").forEach((paso)=>{
          paso.innerText=""
        });*/
        (<HTMLInputElement>document.getElementsByClassName("faltaPaso")[i]).innerText = '';
      }
    }

    if (correcto) {
      this.aniadirReceta();
    }
  }

  aniadirReceta() {
    /*Añadir la imagen principal a firebase*/
    var urlImagenPrincipal: string="";
    this.tmp_file=this.tmp_files[0]; //poner 1
    console.log(this.tmp_file);
    this.currentFileUpload = new FileUpload(this.tmp_file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      urlImagen => {
        urlImagenPrincipal=localStorage.getItem("downloadURL")!;
        console.log(urlImagenPrincipal);
        console.log(localStorage.getItem("downloadURL"));
      },
      error => {
        console.log(error);
      }
    );
      setTimeout(() => {
        /*Añadir la nueva receta a firebase*/
    this.firestore
      .collection('recetas')
      .add({
        id: this.idReceta,
        correoUsuario: this.correo,
        nombre: this.nombreReceta,
        categoria: this.categoria,
        comensales: this.comensales,
        dificultad: this.dificultad,
        duracion: this.duracion,
        fecha: new Date(),
        imagen: urlImagenPrincipal
      })
      .then((recetaCreada) => {
        console.log('Se ha creado la receta.');
      })
      .catch((error) => {
        console.error('Se ha producido un error al crear la receta.');
      });
      }, 3000);
    
setTimeout(() => {
  /*Añadir los nuevos ingredientes a firebase*/
    var ingredientes = document.getElementsByClassName('ingrediente');
    for (let i = 0; i < ingredientes.length; i++) {
      this.nombreIngrediente = (<HTMLInputElement>ingredientes[i].children[0].children[0].childNodes[0]).value
      this.cantidad = (<HTMLInputElement>ingredientes[i].children[0].children[1].childNodes[0]).value;
      console.log(this.cantidad)
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
}, 6000);
    
setTimeout(() => {
  /*Añadir las imágenes de los pasos a firebase*/
    for (let i = 1; i < this.tmp_files.length; i++) {
      if (this.tmp_files[i] && this.tmp_files[i]!=null && this.tmp_files[i]!=undefined) {
        this.currentFileUpload = new FileUpload(this.tmp_files[i]!);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          urlImagen => {
            this.imagenesPasos[i]=localStorage.getItem("downloadURL")!;
            console.log(this.imagenesPasos[i]);   //¿Por qué entra tantas veces por aquí?
          },
          error => {
            console.log(error);
          }
        );
      }  
        console.log(this.tmp_files[i]);
    }
}, 9000);
    
setTimeout(() => {
  /*Añadir los nuevos pasos a firebase*/
    var pasos = document.getElementsByClassName('paso');
    for (let i = 0, j=1; i < pasos.length/*this.numPaso-1*/; i++, j++) {
      if (this.tmp_files[j] && this.tmp_files[j]!=null && this.tmp_files[j]!=undefined) {
        this.descripcion = (<HTMLInputElement>pasos[i].children[0].children[0]).value;
        console.log(this.descripcion);
        this.firestore
          .collection('pasos')
          .add({
            id: i+1,
            descripcion: this.descripcion,
            idReceta: this.idReceta,
            urlImagen: this.imagenesPasos[j]
          })
          .then((pasoCreado) => {
            console.log('Se ha creado el paso.');
          })
          .catch((error) => {
            console.error('Se ha producido un error al crear el paso.');
          });
      }else{
        this.descripcion = (<HTMLInputElement>pasos[i].children[0].children[0]).value;
        console.log(this.descripcion);
        this.firestore
          .collection('pasos')
          .add({
            id: i+1,
            descripcion: this.descripcion,
            idReceta: this.idReceta,
            urlImagen: ""
          })
          .then((pasoCreado) => {
            console.log('Se ha creado el paso.');
          })
          .catch((error) => {
            console.error('Se ha producido un error al crear el paso.');
          });
      }
    }
}, 12000);
    setTimeout(() => {
      //console.log(urlImagenPrincipal);
    console.log(this.imagenesPasos);
    }, 15000);
    

   setTimeout(() => {
      localStorage.setItem("toast", "true");
       location.href="/perfilUsuario";
    }, 2147483647);
  }

  selectFile(event: Event) {
    this.tmp_file=((<HTMLInputElement>event.target)!.files![0]);
  }

  fileChange(event: Event) {
    
    //this.tmp_files.push((<HTMLInputElement>event.target)!.files![0]);
    var posicion=Number((<HTMLInputElement>event.target).id.substring(6,7));
    this.tmp_files[posicion]=((<HTMLInputElement>event.target)!.files![0]);
    console.log(this.tmp_files);
    console.log(this.tmp_files[0]);
    this.numImagenes++;
    /*var posicion=Number((<HTMLInputElement>event.target).id.substring(6,7));
    var imagenes=document.querySelectorAll(".imagen")!;
    this.tmp_files[posicion]=imagenes[posicion];
    console.log(this.tmp_files);
    this.numImagenes++;*/


  }




  aaa(){
    this.tmp_file=this.tmp_files[0];
    var file=this.tmp_files[0].name;
    console.log(this.tmp_file);
    console.log(file);
    console.log(this.tmp_files[0]);
  }



  /*Añadir las imágenes de los pasos a firebase*/
    //var files=this.selectedFiles;
    //console.log(this.selectedFiles[0].item(1));
    /*if ((<HTMLInputElement><unknown>document.querySelectorAll(".imagen")).files==null) {
      console.log("1");
      console.log((<HTMLInputElement><unknown>document.querySelectorAll(".imagen")).files);//.files![1]);
    } else {
      console.log("2");
      this.selectedFiles[0]=(<HTMLInputElement>document.querySelector(".imagen")).files!;
      console.log(this.selectedFiles);
    }*/
    
    /*for (let i = 0; i < this.numImagenes+1; i++) {
      file = this.selectedFiles[i].item(0);
      if (file!=null) {
      //this.selectedFile = undefined!;
        this.currentFileUpload = new FileUpload(file!);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
    }*/
  }


