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
  idReceta: number=0;
  nomReceta: string='s'
  constructor(public firestore: AngularFirestore, private _pasarReceta: RecetasService, private router:Router, private _pasarNomReceta: RecetasService) {
    this.recetas = firestore.collection('recetas').valueChanges();
     /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarReceta.mandarReceta.subscribe(idReceta=>{
    this.idReceta=idReceta;
    })
    /*Con el método "subscribe" recibe el dato que manda la función "mandarRecetaNombre".*/
    this._pasarNomReceta.mandarRecetaNombre.subscribe(nomReceta=>{
        console.log(nomReceta+"="+ this.nomReceta)
      this.nomReceta=nomReceta;
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
