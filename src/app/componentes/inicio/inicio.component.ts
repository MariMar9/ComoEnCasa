import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../core/services/cargar-scripts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuarioConectado=false;
  
  constructor(private _CargaScripts: CargarScriptsService) {
    this.usuarioConectado = _CargaScripts.conectado();
  }

  ngOnInit(): void {
  }

}
