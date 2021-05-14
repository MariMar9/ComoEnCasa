import { Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
    public auth: AngularFireAuth,firestore: AngularFirestore,private ngZone: NgZone) {
    /*Rellena la variable usuarios con una colección de tipo usuarios*/
    this.usuarios = firestore.collection('usuarios').valueChanges();
  }

  ngOnInit(): void {
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

  validarDatos() {
    /*Variable para cuando todos los campos estén rellenos y las contraseñas coincidan.*/
    let correcto = true;
    /*Comprobación de que todos los campos estén rellenos y las contraseñas coinciden.*/
    if (this.nombre == '') {
      (<HTMLInputElement>document.getElementById('errorNombre')).innerText =
        'Rellene este campo.';
      correcto = false;
    } else {
      (<HTMLInputElement>document.getElementById('errorNombre')).innerText = '';
    }
    if (this.email == '') {
      (<HTMLInputElement>document.getElementById('errorEmail')).innerText =
        'Rellene este campo.';
      correcto = false;
    } else {
      (<HTMLInputElement>document.getElementById('errorEmail')).innerText = '';
    }
    if (this.password == '') {
      (<HTMLInputElement>document.getElementById('errorPassword')).innerText =
        'Rellene este campo.';
      correcto = false;
    } else {
      (<HTMLInputElement>document.getElementById('errorPassword')).innerText =
        '';
    }
    if (this.confirmPassword == '') {
      (<HTMLInputElement>(
        document.getElementById('errorConfirmPassword')
      )).innerText = 'Rellene este campo.';
      correcto = false;
    } else {
      if (this.password != this.confirmPassword) {
        (<HTMLInputElement>(
          document.getElementById('errorConfirmPassword')
        )).innerText = 'Las contraseñas no coinciden.';
        correcto = false;
      } else {
        (<HTMLInputElement>(
          document.getElementById('errorConfirmPassword')
        )).innerText = '';
      }
    }
    /*Crea la cuenta y si hay errores, los filtra y saca el mensaje correspondiente.*/
    if (correcto) {
      this.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((resultado) => {
          this.auth.onAuthStateChanged((user) => {
            if (user) {
              user.updateProfile({
                displayName: this.nombre,     
              });
              
              setTimeout(() => {
                localStorage.setItem('usuario',JSON.stringify(user));
                setTimeout(() => {
                   window.location.href = '/inicio';
                }, 400);
              }, 200); 
            }
          });
        })
        .catch((error) => {
          if (error.message == 'The email address is badly formatted.') {
            (<HTMLInputElement>(
              document.getElementById('errorEmail')
            )).innerText = 'Formato de correo electrónico erróneo.';
            (<HTMLInputElement>(
              document.getElementById('errorPassword')
            )).innerText = '';
            correcto = false;
          } else if (
            error.message == 'Password should be at least 6 characters'
          ) {
            (<HTMLInputElement>(
              document.getElementById('errorPassword')
            )).innerText = 'La contraseña debe tener al menos 6 caracteres.';
            (<HTMLInputElement>(
              document.getElementById('errorEmail')
            )).innerText = '';
            correcto = false;
          } else if (
            error.message ==
            'The email address is already in use by another account.'
          ) {
            (<HTMLInputElement>(
              document.getElementById('errorPassword')
            )).innerText = 'Ya existe un usuario con esa cuenta.';
            (<HTMLInputElement>(
              document.getElementById('errorEmail')
            )).innerText = '';
            correcto = false;
          } else {
            alert(
              'Se ha producido un error. Introduzca sus credenciales de nuevo por favor.\nSi el error persiste, póngase en contacto con nosotras.'
            );
            correcto = false;
          }
          if (new firebase.auth.GoogleAuthProvider() == null) {
            console.log('error');
          }
        });
    }
  }
}
