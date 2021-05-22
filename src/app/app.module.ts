import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule }  from  '@angular/forms';
import { HttpClientModule }  from  '@angular/common/http';
import { NoopAnimationsModule }  from  '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { MatInputModule }  from  '@angular/material/input';

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

import { RecetasComponent } from './componentes/recetas/recetas-por-categoria/recetas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SobreNosotrasComponent } from './componentes/datosInteres/sobre-nosotras/sobre-nosotras.component';
import { OrdenarAlfComponent } from './componentes/recetas/ordenar-alf/ordenar-alf.component';
import { MostrarRecetaComponent } from './componentes/recetas/mostrar-receta/mostrar-receta.component';
import { CrearRecetaComponent } from './componentes/recetas/crear-receta/crear-receta.component';
import { CookieService } from 'ngx-cookie-service';
import { CookiesComponent } from './core/cookies/cookies.component';
import { BuscarRecetaComponent } from './componentes/recetas/buscar-receta/buscar-receta.component';
import { PerfilUsuarioComponent } from './componentes/usuario/perfil-usuario/perfil-usuario.component';
import { FormUploadComponent } from './componentes/recetas/upload/form-upload/form-upload.component';
import { ListUploadComponent } from './componentes/recetas/upload/list-upload/list-upload.component';
import { DetailsUploadComponent } from './componentes/recetas/upload/details-upload/details-upload.component';


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
    CrearRecetaComponent,
    CookiesComponent,
    BuscarRecetaComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ],
  imports: [
    BrowserModule,
    UsuariosModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
    //MatInputModule
  ],
  providers: [CargarScriptsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
