import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//inicio servicio
import{ CargarScriptsService } from "./cargar-scripts.service"
//fin del servivio

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioComponent } from './inicio/inicio.component';
import { RecetasComponent } from './recetas/recetas.component';
import { OrdenarAlfComponent } from './ordenar-alf/ordenar-alf.component';
import { BuscarRecetaComponent } from './buscar-receta/buscar-receta.component';
import { SobreNosotrasComponent } from './sobre-nosotras/sobre-nosotras.component';
import { UsuariosModule } from './usuario/usuarios.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'recetas', component: RecetasComponent},
  { path: 'ordenarAlf', component: OrdenarAlfComponent},
  { path: 'buscarReceta', component: BuscarRecetaComponent},
  { path: 'sobreNosotras', component: SobreNosotrasComponent},
  { path: '', component:InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

//redirectTo: '/inicio',

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CabeceraComponent,
    InicioComponent,
    RecetasComponent,
    OrdenarAlfComponent,
    BuscarRecetaComponent,
    SobreNosotrasComponent,
  ],
  imports: [
    BrowserModule,
    UsuariosModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFirestoreModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
