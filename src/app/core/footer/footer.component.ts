import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  quitar=false;
  constructor(private _CargaScripts: CargarScriptsService) {
    this.quitar = _CargaScripts.quitarCabFoot();
  }

  ngOnInit(): void {
  }

}
