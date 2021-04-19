import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioComponent } from './inicio/inicio.component';
import { RecetasComponent } from './recetas/recetas.component';
import { OrdenarAlfComponent } from './ordenar-alf/ordenar-alf.component';
import { BuscarRecetaComponent } from './buscar-receta/buscar-receta.component';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SobreNosotrasComponent } from './sobre-nosotras/sobre-nosotras.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CabeceraComponent,
    InicioComponent,
    RecetasComponent,
    OrdenarAlfComponent,
    BuscarRecetaComponent,
    RegistroComponent,
    IniciarSesionComponent,
    SobreNosotrasComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
