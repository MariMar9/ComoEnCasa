import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarRecetaComponent } from './recetasVista/buscar-receta/buscar-receta.component';
import { ContactanosComponent } from './datosInteresVista/contactanos/contactanos.component';
import { InicioComponent } from './inicioVista/inicio.component';
import { MostrarRecetaComponent } from './recetasVista/mostrar-receta/mostrar-receta.component';
import { OrdenarAlfComponent } from './recetasVista/ordenar-alf/ordenar-alf.component';
import { RecetasComponent } from './recetasVista/recetas/recetas.component';
import { SobreNosotrasComponent } from './datosInteresVista/sobre-nosotras/sobre-nosotras.component';
import { CrearRecetaComponent } from './recetasVista/crear-receta/crear-receta.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'ordenarAlf', component: OrdenarAlfComponent },
  { path: 'buscarReceta', component: BuscarRecetaComponent },
  { path: 'sobreNosotras', component: SobreNosotrasComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'mostrarReceta', component: MostrarRecetaComponent },
  { path: 'crearReceta', component: CrearRecetaComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
