import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GuardarUsuarioService } from '../../services/guardar-usuario.service';

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

  constructor(public auth: AngularFireAuth, firestore: AngularFirestore, private _GuardarUsuarioService: GuardarUsuarioService) {
    /*Rellena la variable usuarios con una colección de tipo usuarios*/
    this.usuarios = firestore.collection('usuarios').valueChanges();
    console.log( this.usuarios+"hola")
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

  validarDatos() {
    console.log(this.auth);
    console.log(this.nombre); //cojo el objeto y el nombre
    console.log(this); //cojo el objeto y el nombre
    console.log(this.auth.credential); //cojo el objeto y el nombre
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
      this.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          /*crea un objeto cualquiera (any) y guardamos el valor del nombre y el email*/
          const usuario: any = {
            nombre: this.nombre,
            email: this.email
          }
          this._GuardarUsuarioService.agregarUsuario(usuario)
            .then(() => console.log("Usuario registrado con éxito."))
            .catch(error => {console.log(error)});
        })/*
        .then(() => (
          window.location.href = '/inicio'))*/
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
          if (new firebase.auth.GoogleAuthProvider()==null) {
            console.log("error");
          }
        });
    }
  }
}
