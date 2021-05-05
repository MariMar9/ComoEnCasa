import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarRecetaComponent } from './buscar-receta/buscar-receta.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { InicioComponent } from './inicio/inicio.component';
import { OrdenarAlfComponent } from './ordenar-alf/ordenar-alf.component';
import { RecetasComponent } from './recetas/recetas.component';
import { SobreNosotrasComponent } from './sobre-nosotras/sobre-nosotras.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'ordenarAlf', component: OrdenarAlfComponent },
  { path: 'buscarReceta', component: BuscarRecetaComponent },
  { path: 'sobreNosotras', component: SobreNosotrasComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
