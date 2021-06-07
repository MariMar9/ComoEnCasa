import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { UploadFileService } from '../../recetas/upload/upload-file.service';
import { FileUpload } from '../../recetas/upload/file-upload';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

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
      this._toast.success('Receta creada con éxito.', '', {
        progressBar: false,
      });
      localStorage.removeItem('toast');
    }
    this.usuarioActual = this.firebaseAuth;
    this.recetas = this._pasarReceta.getCollectionRecetas<any>(
      'recetas/',
      'nombre'
    );
  }

  ngOnInit(): void {}

  /**
   * @description Metodo para cerrar la sesion
   */
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
  /**
   *  @description borra una receta
   * @param idReceta id de la receta
   */
  eliminarReceta(idReceta: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá deshacer los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._pasarReceta.eliminarReceta('pasos', idReceta);
        Swal.fire(
          'Borrado',
          'La receta se ha eliminado',
          'success'
        )
      }
    })
    /*
    var confirmarBorrado = confirm(
      '¿Estás seguro de que quieres eliminar la receta?'
    );
    if (confirmarBorrado) {
      this._pasarReceta.eliminarReceta('pasos', idReceta);
    } else {
      console.log('No borrar.');
    }*/
  }

  /**
   *  @description muestra el input para subir la imagen
   */
  muestra() {
    let contenedorImg = <HTMLDivElement>(
      document.querySelector('.contenedor-img')
    );
    let img = <HTMLImageElement>document.getElementById('image');
    let labelImg = <HTMLLabelElement>document.getElementById('upload-btn');
    labelImg.style.display = 'flex';
  }
  /**
   *  @description oculta el input para subir la imagen
   */
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
  /**
   * @description guarda la imagen del perfil
   * @param elegir booleano (variable inputCambio)
   */
  guardarImagen(elegir: Boolean) {
    if (elegir == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe elegir una imagen antes de guardar',
      });
    } else {
      this.currentFileUpload = new FileUpload(this.tmp_file!);
      this.uploadService.pushFileToStorage(this.currentFileUpload);

      Swal.fire({
        position: 'top-right',
        icon: 'info',
        text: 'Guardando imagen',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        allowOutsideClick:false
      });

      setTimeout(() => {

        this.firebaseAuth.onAuthStateChanged((user) => {
          if (user) {
            /*La exclamación es para indicar que estamos seguros de que no es null*/
            user.updateProfile({
              photoURL: this.currentFileUpload.url,
            });
          }
        });

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Imagen guardada'
        })

      }, 5000);
    }
  }
}
