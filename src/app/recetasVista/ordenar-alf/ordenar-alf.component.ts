import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/services/recetas.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-ordenar-alf',
  templateUrl: './ordenar-alf.component.html',
  styleUrls: ['./ordenar-alf.component.css'],
})
export class OrdenarAlfComponent implements OnInit {
  //recetasFirebase: Observable<any[]>;
  recetas: string[] = [];
  recetasOrden: Observable<any[]>;
  idReceta: number=0;
  constructor(
    public firestore: AngularFirestore,
    private _pasarReceta: RecetasService,
    private _consultarColeccion: RecetasService,
    private _pasarNomReceta: RecetasService
    
  ) {
    /**
     * manda la ruta (path) y el nombre del parámetro
     */
    const path = 'recetas/';
    this.recetasOrden =  this._consultarColeccion.getCollectionRecetas<any>(path, 'nombre')
    this._pasarReceta.mandarReceta.subscribe(idReceta=>{
      this.idReceta=idReceta.id;
      })
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  ngOnInit(): void {}
}


    /*nota de interes: tabajar la coleccion desde un array
    this._consultarColeccion
      .getCollectionRecetas<any>(path, 'nombre')
      .subscribe((recetas) => {
        for (let i = 0; i < recetas.length; i++) {
          this.recetas[i] = recetas[i].nombre;
        //  console.log(this.recetas);
        }
      });*/