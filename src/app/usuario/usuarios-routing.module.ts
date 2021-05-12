import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPerfilUsuarioGuard } from '../core/guards/control-perfil-usuario.guard';
import { ControlRutaGuard } from '../core/guards/control-ruta.guard';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent, canActivate:[ControlRutaGuard]},
  { path: 'iniciarSesion', component: IniciarSesionComponent, canActivate:[ControlRutaGuard]},
  { path: 'perfilUsuario', component: PerfilUsuarioComponent, canActivate:[ControlPerfilUsuarioGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
