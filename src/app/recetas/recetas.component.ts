import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  recetas: Observable<any[]>;

  constructor(public firestore: AngularFirestore) {
    /*Rellena la variable usuarios con una colección de tipo usuarios*/
    this.recetas = firestore.collection('recetas').valueChanges();
  }

  ngOnInit(): void {
  }

}
