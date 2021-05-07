import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-ordenar-alf',
  templateUrl: './ordenar-alf.component.html',
  styleUrls: ['./ordenar-alf.component.css'],
})
export class OrdenarAlfComponent implements OnInit {
  recetasOrdenadas = [''];
  recetasFirebase: Observable<any[]>;

  constructor(public firestore: AngularFirestore,private _pasarReceta: RecetasService) {
    this.recetasFirebase = firestore.collection('recetas').valueChanges();
    //firestore.firestore.collection('recetas').orderBy('nombre')
    this.recetasFirebase.forEach((receta) => {
      for (let i = 0; i < receta.length; i++) {
        for (let j = receta.length - 1; j > i; j--) {
          this.recetasOrdenadas[i] = receta[j].nombre;;
        }
      }
      /**ordenamos las recetas con primero las ordemamos con .sort() y con .map() obtenemos ek nuevo array */
      this.recetasOrdenadas.sort()
    });
  }

  mandarRecetaNombre(idReceta: string) {
    console.log("manda"+" "+idReceta)
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

  ngOnInit(): void {}
}
