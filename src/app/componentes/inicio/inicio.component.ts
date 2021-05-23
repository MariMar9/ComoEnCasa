import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  nombreReceta: string = '';
  recetas: Observable<any[]>;
  usuarioConectado = false;
  color: string = '';
  constructor(
    private _CargaScripts: CargarScriptsService,
    private _pasarReceta: RecetasService
  ) {
    this.usuarioConectado = _CargaScripts.conectado();
    this.recetas = this._pasarReceta.getCollectionRecientes<any>(
      'recetas/',
      'fecha'
    );
    this._pasarReceta.mandarReceta.subscribe((nombre) => {
      this.nombreReceta = nombre;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      var num = 1;
      let boton = document.querySelectorAll<HTMLElement>('.btn-ver');
      boton.forEach((bot) => {
        bot.setAttribute('class', 'btn btn-ver' +num);
        num++;
      });
    }, 500);
  }
  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }
}
