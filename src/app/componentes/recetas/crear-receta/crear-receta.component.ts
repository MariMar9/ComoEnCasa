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
  currentFileUpload: FileUpload=new FileUpload(new File(["foo"], "foo.txt", {type: "text/plain"}));
  tmp_file: File=new File(["foo"], "foo.txt", {type: "text/plain"});
  tmp_files: File[]=new Array(new File(["foo"], "foo.txt", {type: "text/plain"}));

  /*Variables de la pantalla de carga*/
  frases: string[]=new Array("Se está lavando las manos...", "Se están preparando los ingredientes...", "Se está cocinando...", "Se están colocando los platos...", "¡Comida servida!");
  percentage: Number=new Number();
  pararIntervalo: boolean=false;
  relleno: number=236;

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
    let spanNuevoPaso = document.createElement('span');
    spanNuevoPaso.setAttribute('class', 'textoPaso');
    let texto = document.createTextNode('Paso ' + this.numPaso + ': ');
    spanNuevoPaso.appendChild(texto);
    grupoPaso.appendChild(spanNuevoPaso);

    let inputNuevoPaso = document.createElement('input');
    inputNuevoPaso.setAttribute('id', 'paso' + this.numPaso);
    inputNuevoPaso.setAttribute('class', 'form-control form-group input-crear-receta');
    inputNuevoPaso.setAttribute('maxlength','200');

    let falloPaso = document.createElement('p');
    falloPaso.setAttribute('class','faltaPaso');

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

    let pasos = document.getElementById('pasos');
    pasos!.appendChild(nuevoPaso);

    this.numPaso++;
    inputNuevaImagen.addEventListener('change', (event) => {
      this.fileChange(event);
    });
    botonImg.addEventListener('click', (event) => {
      this.quitarPaso(event, this.tmp_files);
    });
    console.log("Longitud: "+this.tmp_files.length)

    this._CargaScripts.carga(['js/javaScript']);
    (<HTMLScriptElement>document.querySelector('script[src="../assets/js/javaScript.js"]')).remove()
  }

  quitarPaso(e: Event, tmp_files: File[]) {
    var posicion=0;
    if(((<HTMLButtonElement>e.target)!=null)){
      if(((<HTMLButtonElement>e.target).parentElement)?.parentElement?.className=="paso form-group d-flex align-items-center"){
        ((<HTMLButtonElement>e.target).parentElement)?.parentElement?.remove();
        if (((((<HTMLButtonElement>e.target).parentElement!).parentElement!).firstElementChild!).children[1].id.length<6) {
          posicion=Number(((((<HTMLButtonElement>e.target).parentElement!).parentElement!).firstElementChild!).children[1].id.charAt(4));
          console.log("Posición 1: "+posicion);
        } else {
          posicion=Number(((((<HTMLButtonElement>e.target).parentElement!).parentElement!).firstElementChild!).children[1].id.substring(4,6));
          console.log("Posición 2: "+posicion);
        }
        
      }else if((<HTMLButtonElement>e.target).className=="btn btn-secondary quitarPaso ml-4"){
        ((<HTMLButtonElement>e.target).parentElement)?.remove();
        if ((((<HTMLButtonElement>e.target).parentElement!).firstElementChild!).children[1].id.length<6) {
          posicion=Number((((<HTMLButtonElement>e.target).parentElement!).firstElementChild!).children[1].id.charAt(4));
          
        } else {
          posicion=Number((((<HTMLButtonElement>e.target).parentElement!).firstElementChild!).children[1].id.substring(4,6));
          console.log("Posición 4: "+posicion);
        }
      }
    }
    console.log("Posición: "+posicion);
    this.tmp_files.splice(posicion, 1);
    console.log("Array de imágenes:");
    console.log(this.tmp_files);
    var longitud=document.getElementsByClassName("textoPaso").length;
    for (let i = 0; i < longitud; i++) {
      console.log(i);
      (<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).innerText="Paso "+(i+2)+": ";
      (<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).setAttribute('id', 'paso' + (i+2));
      ((<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).nextElementSibling)!.setAttribute('id', 'paso' + (i+2));
      console.log(((<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).nextElementSibling));
      (((((<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).nextElementSibling)!.nextElementSibling)!.nextElementSibling)!.children[0]).setAttribute('id', 'imagen' + (i+2));
      console.log((((((<HTMLInputElement>document.getElementsByClassName("textoPaso")[i]).nextElementSibling)!.nextElementSibling)!.nextElementSibling)!.children[0]));
    }
    this.numPaso--;
  }
  
  validarDatos() {
    let correcto = true;
    if (this.tmp_files[0].name=="foo.txt") {
      console.log("imagen principal vacia")
      document.getElementById("faltaImagen")!.innerText="Falta imagen.";
      correcto = false;
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
    /*var urlImagenPrincipal: string="";
    this.currentFileUpload = new FileUpload(this.tmp_files[0]);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      urlImagen => {
        setTimeout(() => {
          if (localStorage.getItem("downloadURL")) {
            urlImagenPrincipal=localStorage.getItem("downloadURL")!;
            console.log("urlImagenPrincipal: "+urlImagenPrincipal);
            console.log("urlImagenLocalStorage: "+localStorage.getItem("downloadURL"));
          }
        }, 1000);
      },
      error => {
        console.log(error);
      }
    );*/

    let tiempo=0;
    for (let i = 0; i < this.tmp_files.length; i++) {
      if (this.tmp_files[i] && this.tmp_files[i]!=null && this.tmp_files[i]!=undefined) {
        tiempo++;
      }
    }
    tiempo=(tiempo+3)*1000;

    document.getElementById("mensajePantallaCarga")!.innerText=this.frases[0];
    var urlImagenPrincipal: string="";
    var array: FileUpload [] = []
    for (let i = 0; i < this.tmp_files.length; i++) {
      if (this.tmp_files[i] && this.tmp_files[i]!=null && this.tmp_files[i]!=undefined) {
        this.currentFileUpload = new FileUpload(this.tmp_files[i]!);
        console.log( "archivo subido")
        console.log( this.currentFileUpload)
 
        array[i] = this.currentFileUpload
        console.log(array[i].url)
 
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
            console.log(this.percentage);
          }
        );
      }
    }

    var cont=236;
    var intervalo=setInterval(()=>{
      this.rellenarImagen(this.relleno);
      cont--;
      if (cont==189) {
        clearInterval(intervalo);
      }
    }, 100);


    
setTimeout(() => {
  /*Añadir los nuevos ingredientes a firebase*/
  console.log("Id receta ingredientes: "+this.idReceta);
  document.getElementById("mensajePantallaCarga")!.innerText=this.frases[1];
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
    var intervalo=setInterval(()=>{
    this.rellenarImagen(this.relleno);
    cont--;
    if (cont==142) {
      clearInterval(intervalo);
    }
    }, 100);
}, tiempo);
    
/*setTimeout(() => {
  Añadir las imágenes de los pasos a firebase*/
    /*for (let i = 1; i < this.tmp_files.length; i++) {
      if (this.tmp_files[i] && this.tmp_files[i]!=null && this.tmp_files[i]!=undefined) {
        this.currentFileUpload = new FileUpload(this.tmp_files[i]!);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          urlImagen => {
            this.imagenesPasos[i]=localStorage.getItem("downloadURL")!;
            console.log("imagenPaso "+i+": "+this.imagenesPasos[i]);   //¿Por qué entra tantas veces por aquí?
          },
          error => {
            console.log(error);
          }
        );
      }
    }*/
    /*var i=0;
    this.tmp_files.forEach(file => {
      if (file && file!=null && file!=undefined) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          urlImagen => {
            this.imagenesPasos[i]=localStorage.getItem("downloadURL")!;
            console.log("imagenPaso "+i+": "+this.imagenesPasos[i]);
          },
          error => {
            console.log(error);
          }
        );
      }
      i++;
    });
}, 6000);*/
 /* var arrayImagenesLocalStorage=new Array();
  setTimeout(() => {
      arrayImagenesLocalStorage=localStorage.getItem("imagenesLocalStorage")!.split(";");
      console.log(arrayImagenesLocalStorage);
  }, 8000);
*/

setTimeout(() => {


  console.log("Id receta pasos: "+this.idReceta);
  document.getElementById("mensajePantallaCarga")!.innerText=this.frases[2];
  /*Añadir los nuevos pasos a firebase*/
    var pasos = document.getElementsByClassName('paso');
    console.log("Longitud pasos: "+pasos.length);
    console.log("Número de pasos: "+(this.numPaso-1));
    for (let i = 0; i < pasos.length/*this.numPaso-1*/; i++) {
      if (this.tmp_files[i+1] && this.tmp_files[i+1]!=null && this.tmp_files[i+1]!=undefined) {
        this.descripcion = (<HTMLInputElement>pasos[i].children[0].children[1]).value;
        this.firestore
          .collection('pasos')
          .add({
            id: i+1,
            descripcion: this.descripcion,
            idReceta: this.idReceta,
            urlImagen: array[i+1].url
          })
          .then((pasoCreado) => {
            console.log("número de paso: "+i+", número de imagen: "+(i+1)+", url: "+this.imagenesPasos[i+1]);
          })
          .catch((error) => {
            console.error('Se ha producido un error al crear el paso.');
          });
      }else{
        this.descripcion = (<HTMLInputElement>pasos[i].children[0].children[1]).value;
        this.firestore
          .collection('pasos')
          .add({
            id: i+1,
            descripcion: this.descripcion,
            idReceta: this.idReceta,
            urlImagen: ""
          })
          .then((pasoCreado) => {
            console.log("número de paso: "+i+", número de imagen: "+(i+1));
          })
          .catch((error) => {
            console.error('Se ha producido un error al crear el paso.');
          });
      }
    }
    var intervalo=setInterval(()=>{
    this.rellenarImagen(this.relleno);
    cont--;
    if (cont==95) {
      clearInterval(intervalo);
    }
    }, 100);
}, (tiempo+6000));

    setTimeout(() => {
      /*Añadir la nueva receta a firebase*/
      console.log("Id receta: "+this.idReceta);
      document.getElementById("mensajePantallaCarga")!.innerText=this.frases[3];
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
      foto: array[0].url
    })
    .then((recetaCreada) => {
      console.log('crear imagen principal: '+urlImagenPrincipal);
      localStorage.removeItem("downloadURL");
    })
    .catch((error) => {
      console.error('Se ha producido un error al crear la receta.');
      localStorage.removeItem("downloadURL");
    });
    var intervalo=setInterval(()=>{
    this.rellenarImagen(this.relleno);
    cont--;
    if (cont==48) {
      clearInterval(intervalo);
    }
    }, 100);
    }, (tiempo+12000));

    setTimeout(() => {
    console.log(this.imagenesPasos);
    document.getElementById("mensajePantallaCarga")!.innerText=this.frases[4];
    var intervalo=setInterval(()=>{
    this.rellenarImagen(this.relleno);
    cont--;
    if (cont==0) {
      clearInterval(intervalo);
    }
    }, 100);
    }, (tiempo+15000));
    

   setTimeout(() => {
      localStorage.setItem("toast", "true");
       location.href="/perfilUsuario";
    }, (tiempo+20000));
  }

  fileChange(event: Event) {
    if ((<HTMLInputElement>event.target).id.length<8) {
      var posicion=Number((<HTMLInputElement>event.target).id.charAt(6));
    }else{
      var posicion=Number((<HTMLInputElement>event.target).id.substring(6,8));
    }
    this.tmp_files[posicion]=((<HTMLInputElement>event.target)!.files![0]);
  }

    rellenarImagen(num: number){
      document.getElementById("imagenPantallaCargaColor")!.setAttribute("style", "clip-path: inset("+num+"px 0px 0px 0px)");
      console.log(num);
      num--;
      this.relleno=num;
    }
}


