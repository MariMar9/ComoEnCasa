import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetasService } from 'src/app/core/services/recetas.service';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent implements OnInit {

  nombreReceta: string="";
  recetas: Observable<any[]>;
  
  constructor(private _pasarReceta: RecetasService) {
    const path = 'recetas/'
    this._pasarReceta.mandarReceta.subscribe(nombre=>{
      this.nombreReceta=nombre;
    });
    this.recetas = this._pasarReceta.getCollectionRecetas<any>(path,'id');
  }

  ngOnInit(): void { 
    
  }
  
  pasarReceta(idReceta: number) {
    setTimeout(() => {
      this._pasarReceta.mandarReceta.emit(idReceta);
    }, 200);
  }

}
