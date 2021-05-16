import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent implements OnInit {

  nombreReceta: string="";
  recetas: Observable<any[]>;
  
  constructor(public firestore: AngularFirestore, private _pasarReceta: RecetasService) {
    this._pasarReceta.mandarReceta.subscribe(nombre=>{
      this.nombreReceta=nombre;
    });
    this.recetas = firestore.collection('recetas').valueChanges();
  }

  ngOnInit(): void { }
  
  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

}
