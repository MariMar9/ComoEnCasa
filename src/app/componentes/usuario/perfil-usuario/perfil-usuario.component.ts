import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { UploadFileService } from '../../recetas/upload/upload-file.service';
import { FileUpload } from '../../recetas/upload/file-upload';

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
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        let nombre = <HTMLInputElement>document.getElementById('nombreUsuario');
        let img = <HTMLImageElement>document.getElementById('image');
        this.correo = user!.email!;
        this.nombre = user!.displayName!;
        /**mostrar los datos */
        nombre.innerHTML = this.nombre;
        if (user!.photoURL == null) {
          img.src =
            'https://firebasestorage.googleapis.com/v0/b/comoencasa-website.appspot.com/o/defaults%2Fperfil.png?alt=media&token=2892f74c-eb87-476b-91b3-39d6c8925dda';
        } else {
          img.src = user!.photoURL!;
        }
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

  ngOnInit(): void {}
  /*Metodo para cerrar la sesion*/
  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioGoogle');
    setTimeout(() => {
      this.firebaseAuth.signOut();
      window.location.href = 'inicio';
    }, 200);
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  eliminarReceta(idReceta: number){
    var confirmarBorrado=confirm("¿Estás seguro de que quieres eliminar la receta?");
    if (confirmarBorrado) {
      console.log("Borrar.");
      var eliminar=this._pasarReceta.eliminarReceta("pasos", idReceta);
      /*eliminar.subscribe(element => {
        console.log(element);
      });*/

      eliminar.forEach(element => {
        console.log(Object.entries(element)[0][0][0]);
        
      });
      /*eliminar.forEach(element => {
        console.log(Object.entries(element)[0][0][0]);
        
      });*/
      
    } else {
      console.log("No borrar.");
    }
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
    return (this.inputCambio = true);
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

        this.firebaseAuth.onAuthStateChanged((user) => {
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
