import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  recetas: Observable<any[]>;
  categoria:string="";

  constructor(public firestore: AngularFirestore, private _pasarCategoria: RecetasService) {
    /*Rellena la variable usuarios con una colección de tipo usuarios*/
    this.recetas = firestore.collection('recetas').valueChanges();
  }

  ngOnInit(): void {
    /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarCategoria.mandarCategoria.subscribe(categoria=>{
      this.categoria=categoria;
    });
  }

}
