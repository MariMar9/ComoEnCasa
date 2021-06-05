import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/firestore';
import { distinctUntilChanged } from 'rxjs/operators';
import { UploadFileService } from 'src/app/componentes/recetas/upload/upload-file.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  /*Pasa datos del component Cabecera al component Recetas.*/
  @Output() mandarCategoria: EventEmitter<any> = new EventEmitter();
  @Output() mandarReceta: EventEmitter<any> = new EventEmitter();

  constructor(private firestore: AngularFirestore, private uploadService: UploadFileService, private storage: AngularFireStorage) { }
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

    var collectionRecetasImg:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("recetas", ref => ref.where('id', '==', id));
    collectionRecetasImg.get().toPromise()
    .then((db)=>{
      db.forEach((receta) => {
        var collectionImagen = this.storage.ref("/uploads").listAll();
        collectionImagen.forEach(element => {
          element.items.map((a)=>{
              var img=receta.get("foto");
              a.getDownloadURL().then((url)=>{
                if (url==img) {
                  this.uploadService.deleteFileStorage(a.name);
                }
              });
          });
        });
      });
    });
    
    var collectionPasoImg:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("pasos", ref => ref.where('idReceta', '==', id));
    collectionPasoImg.get().toPromise()
    .then((db)=>{
      db.forEach((receta) => {
        var collectionPasoImagenes = this.storage.ref("/uploads").listAll();
        collectionPasoImagenes.forEach(element => {
          element.items.map((a)=>{
              var img=receta.get("urlImagen");
              a.getDownloadURL().then((url)=>{
                if (url==img) {
                  this.uploadService.deleteFileStorage(a.name);
                }
              });
          });
        });
      });
    })
    .then(()=>{
      var collectionRecetas:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("recetas", ref => ref.where('id', '==', id));
      collectionRecetas.get().toPromise()
      .then((db)=>{
        db.forEach((doc)=>{ 
        collectionRecetas.doc(doc.id).delete()
        });
      });

    var collectionPasos:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("pasos", ref => ref.where('idReceta', '==', id));
    collectionPasos.get().toPromise()
    .then((db)=>{
      db.forEach((doc)=>{  
       collectionPasos.doc(doc.id).delete()
      });
    });

    var collectionIngredientes:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("ingredientes", ref => ref.where('idReceta', '==', id));
    collectionIngredientes.get().toPromise()
    .then((db)=>{
      db.forEach((doc)=>{   
       collectionIngredientes.doc(doc.id).delete()
      });
    });

    var collectionComentarios:AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>("comentarios", ref => ref.where('idReceta', '==', id));
    collectionComentarios.get().toPromise()
    .then((db)=>{
      db.forEach((doc)=>{  
       collectionComentarios.doc(doc.id).delete()
      });
    });
    });

  }
  
}
