import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  /*variable para controlar sesion usuario*/
  estaLogeado = false;
  /*Variables con los datos del formulario*/
  email: string = '';
  password: string = '';
  /*Variable para contar los intentos que quedan para que se bloquee la cuenta.*/
  intentos: number = 5;

  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {
    /*Mostrar imágenes del fomrulario aleatoriamente*/
    let imagenes = new Array(
      '../../../assets/imagenesRandom/chocolate1.jpeg',
      '../../../assets/imagenesRandom/chocolate2.jpeg',
      '../../../assets/imagenesRandom/espaguetis.jpeg',
      '../../../assets/imagenesRandom/helado.jpeg',
      '../../../assets/imagenesRandom/pasta.jpeg',
      '../../../assets/imagenesRandom/patatas.jpeg',
      '../../../assets/imagenesRandom/tortitas.jpeg'
    );
    let imagen = imagenes[Math.floor(Math.random() * (6 + 1))];
    let elemento = <HTMLInputElement>(
      document.getElementsByClassName('bg-image')[0]
    );
    elemento.setAttribute(
      'style',
      "background-image: url('" + imagen + "'" + ')'
    );
  }

  validarDatos() {
    /*Inicia sesión y si hay errores, los filtra y saca el mensaje correspondiente.*/

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            var uid = user.uid;
            var displayName = user.displayName;
            localStorage.setItem('usuario',JSON.stringify(user));
           
          }
        });
        location.href = '/inicio'
      })
      .catch((error) => {
        this.estaLogeado = false;
        localStorage.removeItem('usuario');
        if ((<HTMLInputElement>document.getElementById('email')).value == '') {
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            'Rellene el campo.';
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText = '';
        } else if (error.message == 'The email address is badly formatted.') {
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            'Formato de correo electrónico erróneo.';
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText = '';
        } else if (
          error.message ==
          'The password is invalid or the user does not have a password.'
        ) {
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText =
            'La contraseña es incorrecta.' +
            (this.intentos > 0 && this.intentos <= 3
              ? 'Le quedan ' + this.intentos + ' intentos'
              : '');
          this.intentos = this.intentos - 1;
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            '';
        } else if (
          error.message ==
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText = 'El usuario no existe.';
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            '';
        } else if (
          error.message ==
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        ) {
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText =
            'Usuario bloqueado. Puede intentarlo de nuevo más tarde.';
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            '';
          this.intentos = 5;
        } else if (
          error.message ==
          'The user account has been disabled by an administrator.'
        ) {
          (<HTMLInputElement>(
            document.getElementById('errorPassword')
          )).innerText = 'La cuenta ha sido inhabilitada.';
          (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
            '';
        } else {
          alert(
            'Se ha producido un error. Introduzca sus credenciales de nuevo por favor.\nSi el error persiste, póngase en contacto con nosotras.'
          );
        }
        if (new firebase.auth.GoogleAuthProvider() == null) {
          console.log('error');
        }
      });
  }

  /**funcion para iniciar sesión y registrarse desde google */
  iniciarSesionGoogle() {
    var proveedor = new firebase.auth.GoogleAuthProvider();
    proveedor.addScope('profile');
    proveedor.addScope('email');
    firebase
      .auth()
      .signInWithPopup(proveedor)
      .then(()=>{
        this.auth.onAuthStateChanged((user)=>{
          if (user) {
            localStorage.setItem('usuarioGoogle', JSON.stringify(user));
          }
        })
        location.href = '/inicio';
      })
  }
}
