import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  /*variables*/
  nombreReceta: string = '';
  recetas: Observable<any[]>;
  usuarioConectado = false;
  
  /**
   *
   * @param _CargaScripts: service para ver que usuario ha iniciado la sesión
   * @param _pasarReceta: service de recetas para pasar los datos de las colecciones de firestore
   * @param _toast: service para llamar a la biblioteca de toastr
   */
  constructor(
    private _CargaScripts: CargarScriptsService,
    private _pasarReceta: RecetasService,
    private _toast: ToastrService
  ) {
    this.usuarioConectado = _CargaScripts.conectado();
    this.recetas = this._pasarReceta.getCollectionRecientes<any>(
      'recetas/',
      'fecha'
    );
    this._pasarReceta.mandarReceta.subscribe((nombre) => {
      this.nombreReceta = nombre;
    });
    if (localStorage.getItem('toastRegistro')) {
      this._toast.success('Registro completado.');
      localStorage.removeItem('toastRegistro');
    }
  }

  ngOnInit(): void {}

  /**
   * @description recibe el id de la receta, para mandárselo al componente mostrar-receta.ts
   * @param idReceta: id de la receta
   */
  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }
}
