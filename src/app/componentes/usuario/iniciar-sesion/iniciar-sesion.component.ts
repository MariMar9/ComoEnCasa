import { Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';

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

  constructor(public auth: AngularFireAuth, private ngZone: NgZone) {}

  ngOnInit(): void {
    /**al iniciar sesion redirige a la página de inicio */
    this.auth.user.subscribe((user) => {
      if (user) {
        this.ngZone.run(() => {
          window.location.href = 'inicio';
        });
      }
    });

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
 /**
  * @description Inicia sesión y si hay errores, los filtra y saca el mensaje correspondiente.
  */
  validarDatos() {
    var textoErrorSwap ="";
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            var uid = user.uid;
            var displayName = user.displayName;
            localStorage.setItem('usuario', JSON.stringify(user));
          }
        });
        window.location.href = 'inicio';
      })
      /**si hay errores muestra los mensajes de aviso*/
      .catch((error) => {
        this.estaLogeado = false;
        localStorage.removeItem('usuario');
        if ((<HTMLInputElement>document.getElementById('email')).value == '') {
          textoErrorSwap += 'Debe poner un email.<br><hr>';
        }
        if (error.message == 'The email address is badly formatted.' && (<HTMLInputElement>document.getElementById('email')).value != '') {
          textoErrorSwap += 'Formato de correo electrónico erróneo.<br><hr>';
        }
        if ((<HTMLInputElement>document.getElementById('password')).value == ''){
          textoErrorSwap += 'Debe poner una contraseña.<br><hr>';
        }
        if (error.message == 'The password is invalid or the user does not have a password.' &&
        (<HTMLInputElement>document.getElementById('password')).value != '') {
          textoErrorSwap +=
            'La contraseña es incorrecta. ' +
            (this.intentos > 0 && this.intentos <= 3
              ? 'Le quedan ' + this.intentos + ' intentos.<br><hr>'
              : '');
          this.intentos = this.intentos - 1;
        }
        if (
          error.message ==
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          textoErrorSwap += 'El usuario no existe.<br><hr>';
        }
        if (
          error.message ==
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        ) {
          textoErrorSwap +=
            'Usuario bloqueado. Puede intentarlo de nuevo más tarde.<br><hr>';
          this.intentos = 5;
        }
        if (
          error.message ==
          'The user account has been disabled by an administrator.'
        ) {
          textoErrorSwap += 'La cuenta ha sido inhabilitada.<br><hr>';
        }
        if (textoErrorSwap == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se ha producido un error. Introduzca sus credenciales de nuevo por favor.\nSi el error persiste, póngase en contacto con nosotras.',
          });
        }
        if (textoErrorSwap!='') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: textoErrorSwap,
          });
        }
        if (new firebase.auth.GoogleAuthProvider() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, al iniciar su cuenta de gmail.',
          });
        }
      });
  }

  /**
   * @description funcion para iniciar sesión y registrarse desde google
   */
  iniciarSesionGoogle() {
    var proveedor = new firebase.auth.GoogleAuthProvider();
    proveedor.addScope('profile');
    proveedor.addScope('email');
    firebase
      .auth()
      .signInWithPopup(proveedor)
      .then(() => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            localStorage.setItem('usuarioGoogle', JSON.stringify(user));
          }
        });
        window.location.href = 'inicio';
      });
  }
}
