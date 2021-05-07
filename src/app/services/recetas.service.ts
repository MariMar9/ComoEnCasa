import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  /*Pasa datos del component Cabecera al component Recetas.*/
  @Output() mandarCategoria: EventEmitter<any> = new EventEmitter();
  @Output() mandarReceta: EventEmitter<any> = new EventEmitter();
  @Output() mandarRecetaNombre: EventEmitter<any> = new EventEmitter();

  constructor() { }

  

}
