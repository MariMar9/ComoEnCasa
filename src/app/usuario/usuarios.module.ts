import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    //AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
    AngularFireAuthModule  
  ]
})
export class UsuariosModule { }
