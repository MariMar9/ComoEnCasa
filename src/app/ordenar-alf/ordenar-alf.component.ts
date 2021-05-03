import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordenar-alf',
  templateUrl: './ordenar-alf.component.html',
  styleUrls: ['./ordenar-alf.component.css'],
})
export class OrdenarAlfComponent implements OnInit {
  arrayRecetasOrd = [''];
  arrayRecetasOrden: Observable<any[]>;
  recetas = [''];
  constructor(public firestore: AngularFirestore) {
    this.arrayRecetasOrden = firestore.collection('recetas').valueChanges();
    this.arrayRecetasOrden.forEach((receta) => {
      for (let i = 0; i < receta.length; i++) {
        for (let j = receta.length - 1; j > i; j--) {
          this.arrayRecetasOrd[i] = receta[j].nombre;
        }
      }
      this.arrayRecetasOrd.sort().map(function (recetas) {
       
        console.log(recetas);
        (<HTMLInputElement>(
            document.getElementById('recetas')
          )).innerHTML += `<p>${recetas}</p>`;
      });
    });
  }

  ngOnInit(): void {}
}
