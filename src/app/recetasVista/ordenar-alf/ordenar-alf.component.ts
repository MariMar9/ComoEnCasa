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
  recetasOrdenadas = [''];
  recetasFirebase: Observable<any[]>;

  constructor(public firestore: AngularFirestore) {
    this.recetasFirebase = firestore.collection('recetas').valueChanges();
    this.recetasFirebase.forEach((receta) => {
      for (let i = 0; i < receta.length; i++) {
        for (let j = receta.length - 1; j > i; j--) {
          this.recetasOrdenadas[i] = receta[j].nombre;
        }
      }

      /**ordenamos las recetas con primero las ordemamos con .sort() y con .map() obtenemos ek nuevo array */
      this.recetasOrdenadas.sort().map(function (recetas) {
        (<HTMLInputElement>document.getElementById('recetas')).innerHTML += `
        <div class="my-3 p-3 border border-gray" style="background: #f4f9ff;border-radius: 7px;">
            <div class="row receta-contenedor d-flex justify-content-between align-items-center">
                <div class="receta-nombre-icono d-flex align-items-center col-12 col-md-10 col-lg-10">
                    <div class="icon-fab"><i class="fas fa-book-open" style="color: #fff;background: #757575;padding: 8px;border-radius: 5px;"></i></div>
                    <div class="nombre">
                        <p class="text-gray-dark m-0 ml-5">${recetas}</p>
                    </div>
                </div>
  
                <div class="ver-receta col-12 col-md-2 col-lg-2" style="text-align: center">
                    <a href="#">Ver receta</a>
                </div>
            </div>
        </div>
      `;

        /* (<HTMLInputElement>(
            document.getElementById('recetas')
          )).innerHTML += `<p class="m-0 pt-4 pb-4 border-top border-bottom"><a href='#' class="">${recetas}</a></p>`;*/
      });
    });
  }

  ngOnInit(): void {}
}
