import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

//inicio servicio
import { CargarScriptsService } from "./core/services/cargar-scripts.service";
//fin del servivio

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { CabeceraComponent } from './core/cabecera/cabecera.component';
import { UsuariosModule } from './componentes/usuario/usuarios.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ContactanosComponent } from './componentes/datosInteres/contactanos/contactanos.component';
import { from } from 'rxjs';
import { RecetasComponent } from './componentes/recetas/recetas-por-categoria/recetas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SobreNosotrasComponent } from './componentes/datosInteres/sobre-nosotras/sobre-nosotras.component';
import { OrdenarAlfComponent } from './componentes/recetas/ordenar-alf/ordenar-alf.component';
import { MostrarRecetaComponent } from './componentes/recetas/mostrar-receta/mostrar-receta.component';
import { CrearRecetaComponent } from './componentes/recetas/crear-receta/crear-receta.component';

const routes: Routes = [];

//redirectTo: '/inicio',

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CabeceraComponent,
    ContactanosComponent,
    RecetasComponent,
    InicioComponent,
    SobreNosotrasComponent,
    OrdenarAlfComponent,
    MostrarRecetaComponent,
    CrearRecetaComponent
  ],
  imports: [
    BrowserModule,
    UsuariosModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFirestoreModule,
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
