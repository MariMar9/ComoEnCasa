import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarRecetaComponent } from './recetas/buscar-receta/buscar-receta.component';
import { ContactanosComponent } from './datosInteres/contactanos/contactanos.component';
import { InicioComponent } from './inicio/inicio.component';
import { MostrarRecetaComponent } from './recetas/mostrar-receta/mostrar-receta.component';
import { OrdenarAlfComponent } from './recetas/ordenar-alf/ordenar-alf.component';
import { RecetasComponent } from './recetas/recetas-por-categoria/recetas.component';
import { SobreNosotrasComponent } from './datosInteres/sobre-nosotras/sobre-nosotras.component';
import { CrearRecetaComponent } from './recetas/crear-receta/crear-receta.component';

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
