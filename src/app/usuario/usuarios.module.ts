import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';


@NgModule({
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
