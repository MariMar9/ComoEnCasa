import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {

  nombre: string = "";
  correo: string = "";
  recetas: Observable<any[]>;
  
  constructor(public firebaseAuth: AngularFireAuth, public firestore: AngularFirestore,  private _pasarReceta: RecetasService) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        /*La exclamación es para indicar que estamos seguros de que no es null*/
        this.nombre = user.displayName!;
        this.correo=user.email!;
      }
    });
    this.recetas=this.firestore.collection("recetas").valueChanges();
  }

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
  /*Metodo para cerrar la sesion*/
  cerrarSesion() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioGoogle');  
    window.location.href="\inicio";
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

}
