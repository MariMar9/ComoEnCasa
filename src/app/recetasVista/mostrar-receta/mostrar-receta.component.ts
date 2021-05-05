import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-mostrar-receta',
  templateUrl: './mostrar-receta.component.html',
  styleUrls: ['./mostrar-receta.component.css']
})
export class MostrarRecetaComponent implements OnInit {

  recetas: Observable<any[]>;
  idReceta: number=0;

  constructor(public firestore: AngularFirestore, private _pasarReceta: RecetasService) {
    this.recetas = firestore.collection('recetas').valueChanges();
     /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarReceta.mandarReceta.subscribe(idReceta=>{
    this.idReceta=idReceta;
      console.log("Id: "+idReceta)
      console.log("Id: "+this.idReceta)
    });
  }

  ngOnInit(): void {
  }

  redirigir(){
    location.href="/recetas";
    return null;
  }

}
