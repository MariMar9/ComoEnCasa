import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class GuardarUsuarioService {

  constructor(private firestore: AngularFirestore) { }

  /*Retorna una promesa de tipo any*/
  agregarUsuario(usuario: any): Promise<any>{
    return this.firestore.collection('usuarios').add(usuario);
  }

}


