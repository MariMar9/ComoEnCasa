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

  constructor(
    public firestore: AngularFirestore,
    private _pasarReceta: RecetasService,
    private _consultarColeccion: RecetasService,
    private _pasarNomReceta: RecetasService
    
  ) {
    //this.recetasFirebase = firestore.collection('recetas').valueChanges();
    const path = 'recetas/';
    this._consultarColeccion
      .getCollectionRecetas<any>(path, 'nombre')
      .subscribe((recetas) => {
        for (let i = 0; i < recetas.length; i++) {
          this.recetas[i] = recetas[i].nombre;
        //  console.log(this.recetas);
        }
      });
  }

  /**
   * recibe el nombre de la receta se lo pasa a mandaRecetaNombre()
   * @param nomReceta 
   */
  pasarRecetaNom(nomReceta: string) {
    
    setTimeout(() => {
      console.log(nomReceta);
      this._pasarNomReceta.mandarRecetaNombre.emit(nomReceta);
    }, 300);
  }

  ngOnInit(): void {}
}
