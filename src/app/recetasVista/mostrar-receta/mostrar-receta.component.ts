import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from '../../services/recetas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.component.html',
  styleUrls: ['./mostrar-receta.component.css']
})
export class MostrarRecetaComponent implements OnInit {

  recetas: Observable<any[]>;
  ingredientes: Observable<any[]>;
  pasos: Observable<any[]>;
  idReceta: number=0;
  nomReceta: string='s'
  pasosOrd: string[] = [];

  constructor(public firestore: AngularFirestore, private _pasarReceta: RecetasService, private router:Router, private _pasarNomReceta: RecetasService, private _consultarColeccion: RecetasService) {
    const path = 'pasos/';
    this.recetas = firestore.collection('recetas').valueChanges();
    this.ingredientes = firestore.collection('ingredientes').valueChanges();
    this.pasos = this._consultarColeccion.getCollectionRecetas<any>(path,'id')

    /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarReceta.mandarReceta.subscribe(idReceta=>{
    this.idReceta=idReceta;
    })

    setTimeout(() => {
      if (this.idReceta==0 && this.nomReceta=='s') {
        this.router.navigate(['/recetas']);
      }
    }, 300);
  }

  ngOnInit(): void {
  }

}
