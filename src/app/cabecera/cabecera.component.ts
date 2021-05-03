import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CargarScriptsService } from '../services/cargar-scripts.service';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuarioConectado = false;
  quitar = false;
  pasa = true;
  categoria:string="";
  constructor(public firestore: AngularFirestore, private _CargaScripts: CargarScriptsService,private _pasarCategoria: RecetasService) {
    this.quitar = _CargaScripts.quitarCabFoot();
    this.usuarioConectado = _CargaScripts.conectado();
  }
  pasarCategoria(categoria: string) {
    (this._pasarCategoria.mandarCategoria).emit(categoria);
    this.categoria=categoria;
        console.log(this.categoria+" clck "+categoria);

  }
  ngOnInit(): void {}
}
