import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/services/recetas.service';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-ordenar-alf',
  templateUrl: './ordenar-alf.component.html',
  styleUrls: ['./ordenar-alf.component.css'],
})
export class OrdenarAlfComponent implements OnInit {
  recetasOrdenadas:Observable<any[]>;
  recetasFirebase: Observable<any[]>;
    

  constructor(public firestore: AngularFirestore,private _pasarReceta: RecetasService, private _consultarColeccion: RecetasService) {
    this.recetasFirebase = firestore.collection('recetas').valueChanges();
    this.recetasOrdenadas = firestore.collection('recetas').valueChanges();
    
    const path= 'recetas/'
    this._consultarColeccion.getCollectionRecetas<any>(path,'nombre').subscribe(recetas =>{
      
    })

  }

  mandarRecetaNombre(idReceta: string) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }
 
  ngOnInit(): void {}
}
