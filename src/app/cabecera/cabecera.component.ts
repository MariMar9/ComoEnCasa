import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuarioConectado = false;

  constructor(private _CargaScripts: CargarScriptsService) {
    this.usuarioConectado = _CargaScripts.conectado();
  }

  ngOnInit(): void {}
}
