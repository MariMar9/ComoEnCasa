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
 

    if (localStorage.usuario != null) {
         var usuario = JSON.parse(localStorage.usuario);
      (<HTMLInputElement>document.getElementById('nombreUsuario')).innerText =
        usuario.displayName;
      }
      if(localStorage.usuarioGoogle != null){
        var usuarioGoogle = JSON.parse(localStorage.usuarioGoogle);
        (<HTMLInputElement>document.getElementById('nombreUsuarioGoogle')).innerText =
        usuarioGoogle.displayName;
      }
  }
  /**Metodo para cerrar la sesion*/
  cerrarSesion() {
    this.firebaseAuth.signOut();
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioGoogle');  
    window.location.href="\inicio";
  }
}
