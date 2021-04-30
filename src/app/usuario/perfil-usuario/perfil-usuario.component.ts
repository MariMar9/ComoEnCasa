import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  constructor(public firebaseAuth: AngularFireAuth) {}
  ngOnInit(): void {
    var usuario = JSON.parse(localStorage.usuario);
    if (localStorage.usuario != null) {
      (<HTMLInputElement>document.getElementById('nombreUsuario')).innerText =
        usuario.displayName;
   
        (<HTMLInputElement>document.getElementById('emailUsuario')).innerText =
        usuario.email;
   
   
      }
  }
  /**Metodo para cerrar la sesion*/
  cerrarSesion() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('nombreUsuario');
  }
}
