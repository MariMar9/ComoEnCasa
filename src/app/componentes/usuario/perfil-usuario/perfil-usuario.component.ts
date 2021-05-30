import { Lexer, ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { UploadFileService } from '../../recetas/upload/upload-file.service';
import { FileUpload } from '../../recetas/upload/file-upload';
import { UserTrackingService } from '@angular/fire/analytics';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  nombre: string = '';
  correo: string = '';
  recetas: Observable<any[]>;
  inputCambio: Boolean = false;
  usuarioActual: AngularFireAuth;
  tmp_file: File = new File(['foo'], 'foo.txt', { type: 'text/plain' });
  currentFileUpload: FileUpload = new FileUpload(
    new File(['foo'], 'foo.txt', { type: 'text/plain' })
  );
  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private uploadService: UploadFileService,
    private _pasarReceta: RecetasService,
    private _toast: ToastrService
  ) {
    let imagen = <HTMLImageElement>document.getElementById('image');
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        /*La exclamación es para indicar que estamos seguros de que no es null*/
        this.nombre = user.displayName!;
        this.correo = user.email!;
      }
    });

    if (localStorage.getItem('toast')) {
      this._toast.success('Receta creada con éxito.');
      localStorage.removeItem('toast');
    }
    this.usuarioActual = this.firebaseAuth;
    this.recetas = this._pasarReceta.getCollectionRecetas<any>(
      'recetas/',
      'nombre'
    );
  }

  ngOnInit(): void {
    let img = <HTMLImageElement>document.getElementById('image');
    if (localStorage.usuario != null) {
      var usuario = JSON.parse(localStorage.usuario);
      (<HTMLInputElement>document.getElementById('nombreUsuario')).innerText =
        usuario.displayName;
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          /*La exclamación es para indicar que estamos seguros de que no es null*/
          this.nombre = user.displayName!;
          this.correo = user.email!;
        }
        if (user?.photoURL == null) {
          img.src =
            'https://firebasestorage.googleapis.com/v0/b/comoencasa-website.appspot.com/o/defaults%2Fperfil.png?alt=media&token=2892f74c-eb87-476b-91b3-39d6c8925dda';
        } else {
          img.src = user?.photoURL + '';
        }
      });
    }
    if (localStorage.usuarioGoogle != null) {
      var usuarioGoogle = JSON.parse(localStorage.usuarioGoogle);
      (<HTMLInputElement>(
        document.getElementById('nombreUsuarioGoogle')
      )).innerText = usuarioGoogle.displayName;

      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          /*La exclamación es para indicar que estamos seguros de que no es null*/
          this.nombre = user.displayName!;
          this.correo = user.email!;
        }
        if (user?.photoURL == null) {
          img.src =
            'https://firebasestorage.googleapis.com/v0/b/comoencasa-website.appspot.com/o/defaults%2Fperfil.png?alt=media&token=2892f74c-eb87-476b-91b3-39d6c8925dda';
        } else {
          img.src = user?.photoURL + '';
        }
      });
    }
  }
  /*Metodo para cerrar la sesion*/
  cerrarSesion() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioGoogle');
    setTimeout(() => {
      window.location.href = 'inicio';
    }, 200);
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  /**muestra y oculta el input para subir la imagen */
  muestra() {
    let contenedorImg = <HTMLDivElement>(
      document.querySelector('.contenedor-img')
    );
    let img = <HTMLImageElement>document.getElementById('image');
    let labelImg = <HTMLLabelElement>document.getElementById('upload-btn');
    labelImg.style.display = 'flex';
  }
  oculta() {
    let contenedorImg = <HTMLDivElement>(
      document.querySelector('.contenedor-img')
    );
    let img = <HTMLImageElement>document.getElementById('image');
    let labelImg = <HTMLLabelElement>document.getElementById('upload-btn');
    labelImg.style.display = 'none';
  }

  fileChange(event: Event) {
    this.tmp_file = (<HTMLInputElement>event.target)!.files![0];
    let preview = <HTMLImageElement>document.getElementById('image');
    let src = URL.createObjectURL((<HTMLInputElement>event.target)!.files![0]);
    preview.src = src;
    return this.inputCambio=true;
  }

  guardarImagen(elegir: Boolean) {
    if (elegir == false) {
      this._toast.error('Debe elegir una imagen', 'Error', {
        timeOut: 2000,
      });
    } else {
      this.currentFileUpload = new FileUpload(this.tmp_file!);
      this.uploadService.pushFileToStorage(this.currentFileUpload);

      console.log('service' + this.uploadService);
      this._toast.info('Guardando imagen', 'Procesando...', {
        timeOut: 5000,
      });

      setTimeout(() => {
        this._toast.success('Imagen guardada', 'Éxito', {
          progressBar: false,
          timeOut: 6000,
        });

        this.usuarioActual.onAuthStateChanged((user) => {
          if (user) {
            /*La exclamación es para indicar que estamos seguros de que no es null*/
            user.updateProfile({
              photoURL: this.currentFileUpload.url,
            });
          }
        });
      }, 5000);
    }
  }
}

/*nuevaImg.setAttribute('src', user!.photoURL!);*/
