import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  /*Pasa datos del component Cabecera al component Recetas.*/
  @Output() mandarCategoria: EventEmitter<any> = new EventEmitter();
  @Output() mandarReceta: EventEmitter<any> = new EventEmitter();
  @Output() mandarRecetaNombre: EventEmitter<any> = new EventEmitter();

  constructor(private firestore: AngularFirestore) { }

  getCollectionRecetas<tipo>(path:string, parametro:string){
    const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.orderBy(parametro));
    return collectionRecetas.valueChanges();
  }

}
