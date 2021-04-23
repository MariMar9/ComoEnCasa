import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
 
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
 
  email: string="";
  password: string="";
 
  constructor(public auth: AngularFireAuth) { }
 
  ngOnInit(): void {
  }
 
  validarDatos() {
    console.log(this.password);
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(resultado => location.href="/inicio")
    .catch((error) => {
      if ((<HTMLInputElement>document.getElementById("email")).value=="") {
        (<HTMLInputElement>document.getElementById("errorEmail")).innerText="Rellene el campo.";
        (<HTMLInputElement>document.getElementById("errorPassword")).innerText="";
      } else if (error.message=="The email address is badly formatted.") {
        (<HTMLInputElement>document.getElementById("errorEmail")).innerText="Formato de correo electrónico erróneo.";
        (<HTMLInputElement>document.getElementById("errorPassword")).innerText="";
      }else if (error.message=="The password is invalid or the user does not have a password.") {
        (<HTMLInputElement>document.getElementById("errorPassword")).innerText="La contraseña es incorrecta.";
        (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
      }else if (error.message=="There is no user record corresponding to this identifier. The user may have been deleted.") {
        (<HTMLInputElement>document.getElementById("errorPassword")).innerText="El usuario no existe.";
        (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
      }else if (error.message=="Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
        (<HTMLInputElement>document.getElementById("errorPassword")).innerText="Usuario bloqueado. Puede intentarlo de nuevo más tarde.";
        (<HTMLInputElement>document.getElementById("errorEmail")).innerText="";
      }else{
        alert("Se ha producido un error. Introduzca sus credenciales de nuevo por favor.");
      }
    });
  }
 
}
