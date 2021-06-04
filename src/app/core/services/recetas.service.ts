import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/firestore';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  /*Pasa datos del component Cabecera al component Recetas.*/
  @Output() mandarCategoria: EventEmitter<any> = new EventEmitter();
  @Output() mandarReceta: EventEmitter<any> = new EventEmitter();

  constructor(private firestore: AngularFirestore) { }
  /**
   * Función para obtener el array ordenado de la colección de recetas
   * @param path ruta base datos "recetas/"
   * @param parametro campo nombre de recetas
   * @returns colección de recetas
   */
  getCollectionRecetas<tipo>(path:string, parametro:string){
    const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.orderBy(parametro));
    return collectionRecetas.valueChanges();
  }
  getCollectionRecientes<tipo>(path:string, parametro:string){
    const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.orderBy(parametro, "desc").limit(5));
    return collectionRecetas.valueChanges();
  }
  getCollection<tipo>(path:string){
    const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref);
    return collectionRecetas.valueChanges();
  }
  getcomentarios<tipo>(path:string, parametro:string){
    const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.orderBy(parametro, "desc"));
    return collectionRecetas.valueChanges();
  }
  eliminarReceta<tipo>(path:string, id: number){
    //this.firestore.collection('recetas').doc(id).delete();
    /*console.log("BORRAR RECETA: "+id);
    this.firestore.collection('pasos', ref => ref.where('idReceta', '==', id)).doc().delete().then(()=>{
      console.log("RECETA BORRADA.");
    });*/
    //this.firestore.collection('pasos', ref => ref.where('idReceta', '==', id)).doc().delete();


    /*const collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.where('idReceta', '==', id));
    console.log(collectionRecetas.valueChanges())
    collectionRecetas.doc("doc_id").delete();
    return collectionRecetas.valueChanges();*/

    var documento=""
    var collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.where('idReceta', '==', id));
    collectionRecetas.get().toPromise()
    .then((db)=>{
      db.forEach((doc)=>{
       documento=doc.id    
       collectionRecetas.doc(documento).delete()
      })
    console.log(documento)

    })
    return collectionRecetas.valueChanges();
  }
  
}
