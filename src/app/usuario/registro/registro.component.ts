import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  /*Variables con los datos del formulario*/
  nombre: string="";
  email: string="";
  password: string="";
  confirmPassword: string="";

  constructor(public auth: AngularFireAuth) { }
   
  ngOnInit(): void {
     /*Mostrar imágenes del fomrulario aleatoriamente*/
     let imagenes=new Array("../../../assets/img/imagenesRandom/chocolate1.jpeg", "../../../assets/img/imagenesRandom/chocolate2.jpeg", "../../../assets/img/imagenesRandom/espaguetis.jpeg", "../../../assets/img/imagenesRandom/helado.jpeg", "../../../assets/img/imagenesRandom/pasta.jpeg","../../../assets/img/imagenesRandom/patatas.jpeg","../../../assets/img/imagenesRandom/tortitas.jpeg");
     let imagen=imagenes[Math.floor(Math.random() * (6 + 1))];
     let elemento = (<HTMLInputElement>document.getElementsByClassName('bg-image')[0]);
     elemento.setAttribute("style", "background-image: url('"+imagen+"'"+")");
     
  }

  validarDatos(){
    /*Variable para cuando todos los campos estén rellenos y las contraseñas coincidan.*/
    let correcto=true;
    /*Comprobación de que todos los campos estén rellenos y las contraseñas coinciden.*/
    if ((<HTMLInputElement>document.getElementById("nombre")).value=="") {
      (<HTMLInputElement>document.getElementById("errorNombre")).innerText="Rellene este campo.";
      correcto=false;
    } else {
      (<HTMLInputElement>document.getElementById("errorNombre")).innerText="";
    }
    if ((<HTMLInputElement>document.getElementById("email")).value=="") {
      (<HTMLInputElement>document.getElementById("errorEmail")).innerText="Rellene este campo.";
      correcto=false;
    } else {
      (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
    }
    if ((<HTMLInputElement>document.getElementById("password")).value=="") {
      (<HTMLInputElement>document.getElementById("errorPassword")).innerText="Rellene este campo.";
      correcto=false;
    } else {
      (<HTMLInputElement>document.getElementById("errorPassword")).innerText="";
    }
    if ((<HTMLInputElement>document.getElementById("confirmPassword")).value=="") {
      (<HTMLInputElement>document.getElementById("errorConfirmPassword")).innerText="Rellene este campo.";
      correcto=false;
    } else {
      if ((<HTMLInputElement>document.getElementById("password")).value!=(<HTMLInputElement>document.getElementById("confirmPassword")).value) {
        (<HTMLInputElement>document.getElementById("errorConfirmPassword")).innerText="Las contraseñas no coinciden.";
        correcto=false;
      } else {
        (<HTMLInputElement>document.getElementById("errorConfirmPassword")).innerText="";
      }
    }
    /*Crea la cuenta y si hay errores, los filtra y saca el mensaje correspondiente.*/
    if (correcto) {
      this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(resultado => window.location.href="/inicio")
      .catch((error) => {
        if (error.message=="The email address is badly formatted.") {
          (<HTMLInputElement>document.getElementById("errorEmail")).innerText="Formato de correo electrónico erróneo.";
          (<HTMLInputElement>document.getElementById("errorPassword")).innerText="";
        } else if (error.message=="Password should be at least 6 characters.") {
          (<HTMLInputElement>document.getElementById("errorPassword")).innerText="La contraseña debe tener al menos 6 caracteres.";
          (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
        } else if (error.message=="The email address is already in use by another account.") {
          (<HTMLInputElement>document.getElementById("errorPassword")).innerText="Ya existe un usuario con esa cuenta.";
          (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
        }
      });
    }
  }

}
