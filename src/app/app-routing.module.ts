import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarRecetaComponent } from './componentes/recetas/buscar-receta/buscar-receta.component';
import { ContactanosComponent } from './componentes/datosInteres/contactanos/contactanos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MostrarRecetaComponent } from './componentes/recetas/mostrar-receta/mostrar-receta.component';
import { OrdenarAlfComponent } from './componentes/recetas/ordenar-alf/ordenar-alf.component';
import { RecetasComponent } from './componentes/recetas/recetas-por-categoria/recetas.component';
import { SobreNosotrasComponent } from './componentes/datosInteres/sobre-nosotras/sobre-nosotras.component';
import { CrearRecetaComponent } from './componentes/recetas/crear-receta/crear-receta.component';

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
