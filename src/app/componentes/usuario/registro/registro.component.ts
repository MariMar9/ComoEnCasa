import { Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

/*import { userInfo } from 'node:os';*/

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  /*Variables con los datos del formulario*/
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  usuarios: Observable<any[]>;

  constructor(
    public auth: AngularFireAuth,
    firestore: AngularFirestore,
    private ngZone: NgZone
  ) {
    /*Rellena la variable usuarios con una colección de tipo usuarios*/
    this.usuarios = firestore.collection('usuarios').valueChanges();
  }

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
  /**
   * @description registra un usuario y si hay errores, los filtra y saca el mensaje correspondiente.
   */
  validarDatos() {
    /*Variable para cuando todos los campos estén rellenos y las contraseñas coincidan.*/
    let correcto = true;
    /*Variable para los mensajes de error.*/
    var textoErrorSwap ="";
    /*Comprobación de que todos los campos estén rellenos y las contraseñas coinciden.*/
    if (this.nombre == '') {
      textoErrorSwap += 'Debe poner un nombre.<br><hr>';
      correcto = false;
    }
    if (this.email == '') {
      textoErrorSwap += 'Debe poner un email.<br><hr>';
      correcto = false;
    }
    if (this.password == '') {
      textoErrorSwap += 'Debe poner una contraseña.<br><hr>';
      correcto = false;
    }
    if (this.confirmPassword == '') {
      textoErrorSwap += 'Debe poner una confirmación de la contraseña.<br><hr>';
      correcto = false;
    } else {
      if (this.password != this.confirmPassword && this.password != '') {
        textoErrorSwap += 'Las contraseñas no coinciden.';
        correcto = false;
      }
    }
    /*Crea la cuenta y si hay errores, los filtra y saca el mensaje correspondiente.*/
    if (correcto) {
      textoErrorSwap='';
      this.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((resultado) => {
          var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://comoencasa-website.firebaseapp.com',
            // This must be true.
            handleCodeInApp: true,
          };
          this.auth
            .sendSignInLinkToEmail(this.email, actionCodeSettings)
            .then(() => {
              // The link was successfully sent. Inform the user.
              // Save the email locally so you don't need to ask the user for it again
              // if they open the link on the same device.
              //window.localStorage.setItem('emailForSignIn', this.email);
              // ...
              this.auth.onAuthStateChanged((user) => {
                if (user) {
                  user.updateProfile({
                    displayName: this.nombre,
                  });
                  setTimeout(() => {
                    localStorage.setItem('usuario', JSON.stringify(user));
                    localStorage.setItem('toastRegistro', 'true');
                    this.auth.user.subscribe((user) => {
                      if (user) {
                        this.ngZone.run(() => {
                          window.location.href = 'inicio';
                        });
                      }
                    });
                  }, 500);
                }
              });
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.error(errorCode+"; "+errorMessage)
            });
        })
        .catch((error) => {
          if (error.message == 'The email address is badly formatted.') {
            textoErrorSwap += 'Formato de correo electrónico erróneo.';
          }
          if (error.message == 'Password should be at least 6 characters') {
            textoErrorSwap += 'La contraseña debe tener al menos 6 caracteres.';
          }
          if (error.message == 'The email address is already in use by another account.') {
            textoErrorSwap += 'Ya existe un usuario con esa cuenta.';
          }
          if (textoErrorSwap == '') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Se ha producido un error. Introduzca sus credenciales de nuevo por favor.\nSi el error persiste, póngase en contacto con nosotras.',
            });
          }
          if (textoErrorSwap != '') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              html: textoErrorSwap
            });
          }
          if (new firebase.auth.GoogleAuthProvider() == null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Se ha producido un error al registrar su cuenta de gmail.\nSi el error persiste, póngase en contacto con nosotras.',
            });
          }
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: textoErrorSwap
      });
    }
  }
}
