import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { GuardarUsuarioService } from 'src/app/services/guardar-usuario.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {

  usuarioConectado: boolean = false;
  quitar: boolean = false;
  correo: string="";
  numIngrediente: number=2;
  numPaso: number=2;

  /*imagen: File=new File(["foo"], "foo.txt", {
    type: "text/plain",
  });*/
  nombre: string="";
  categoria: string="--Seleccione una--";
  comensales: number=0;
  dificultad: string="--Seleccione una--";
  duracion: string="";

  constructor(public firebaseAuth: AngularFireAuth, public firestore: AngularFirestore, private _CargaScripts: CargarScriptsService, private _recibirCorreoUsuario: GuardarUsuarioService) {
    this.quitar = _CargaScripts.quitarCabFoot();
    
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        /*La exclamación es para indicar que estamos seguros de que no es null*/
        this.correo = user.email!;
      }
    });
  }

  ngOnInit(): void {
  }

  volver(){
    window.location.href="\perfilUsuario";
  }

  aniadirIngrediente(){
    let nuevoIngrediente=document.createElement("p");
    nuevoIngrediente.setAttribute("class", "ingrediente");

    let texto=document.createTextNode("Ingrediente "+this.numIngrediente+": ");
    nuevoIngrediente.appendChild(texto);
    
    let inputNuevoIngrediente=document.createElement("input");
    inputNuevoIngrediente.setAttribute("id", "ingrediente"+this.numIngrediente);
    let inputNuevaCantidad=document.createElement("input");
    inputNuevaCantidad.setAttribute("id", "cantidad"+this.numIngrediente);

    nuevoIngrediente.appendChild(inputNuevoIngrediente);
    /*Mirar cómo añadir texto2 aquí.
    let texto2=document.createTextNode("Cantidad: ");
    inputNuevoIngrediente.appendChild(texto2);*/
    nuevoIngrediente.appendChild(inputNuevaCantidad);

    let ingredientes=document.getElementById("ingredientes");
    ingredientes!.appendChild(nuevoIngrediente);
    this.numIngrediente++;
  }

  aniadirPaso(){
    let nuevoPaso=document.createElement("p");
    nuevoPaso.setAttribute("class", "paso");

    let texto=document.createTextNode("Paso "+this.numPaso+": ");
    nuevoPaso.appendChild(texto);
    
    let inputNuevoPaso=document.createElement("input");
    inputNuevoPaso.setAttribute("id", "paso"+this.numPaso);
    let inputNuevaImagen=document.createElement("input");
    inputNuevaImagen.setAttribute("id", "imagen"+this.numPaso);
    inputNuevaImagen.setAttribute("type", "file");

    nuevoPaso.appendChild(inputNuevoPaso);
    /*Mirar cómo añadir texto2 aquí y en la imagen de los pasos.
    let texto2=document.createTextNode("Imagen: ");
    inputNuevoPaso.appendChild(texto2);*/
    nuevoPaso.appendChild(inputNuevaImagen);

    let pasos=document.getElementById("pasos");
    pasos!.appendChild(nuevoPaso);

    this.numPaso++;
  }

  validarDatos(){
    let correcto=true;
    if (this.nombre=="") {
      console.log("Falta nombre");
      correcto=false;
    }
    if (this.categoria=="--Seleccione una--") {
      console.log("Falta categoría");
      correcto=false;
    }
    if (this.comensales==0) {
      console.log("Falta comensales");
      correcto=false;
    }
    if (this.dificultad=="--Seleccione una--") {
      console.log("Falta dificultad");
      correcto=false;
    }
    if (this.duracion=="") {
      console.log("Falta duracion");
      correcto=false;
    }

    if (correcto) {
      this.aniadirReceta();
    }
  }

  aniadirReceta(){
    this.firestore.collection("recetas").add({
      nombre: this.nombre,
      categoria: this.categoria,
      comensales: this.comensales,
      dificultad: this.dificultad,
      duracion: this.duracion
    })
    .then((recetaCreada) => {
      console.log("Se ha creado la receta.");
    })
    .catch((error) => {
        console.error("Se ha producido un error.");
    });
  }

}
