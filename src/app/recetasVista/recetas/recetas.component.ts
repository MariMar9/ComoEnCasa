import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  categoria:string="";
  recetas: Observable<any[]>;
  fecha=[{}];
  arrayFecha=['']
  constructor(public firestore: AngularFirestore, private _pasarCategoria: RecetasService) {
    this.recetas = firestore.collection('recetas').valueChanges();
     /*Con el método "subscribe" recibe el dato que manda la función "mandarCategoria".*/
    this._pasarCategoria.mandarCategoria.subscribe(categoria=>{
    this.categoria=categoria;
      console.log(categoria+" recetas "+ this.categoria)
    });
  }

  ngOnInit(): void {};
  }
