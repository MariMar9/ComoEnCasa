import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from '../../../core/services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  categoria:string="";
  receta:number=0;
  recetas: Observable<any[]>;
  fecha=[{}];
  arrayFecha=['']
  constructor(public firestore: AngularFirestore, private _pasarCategoria: RecetasService, private _pasarReceta: RecetasService) {
    this.recetas = this._pasarReceta.getCollection<any>('recetas/')
     /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarCategoria.mandarCategoria.subscribe(categoria=>{
    this.categoria=categoria;
    });
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  ngOnInit(): void {};
  }
