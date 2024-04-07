import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminGuard } from '../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TitulacionComponent } from './titulacion/titulacion.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { titulo: 'Dashboard' }, },
  
  //Rutas propias del usuario logeado
  { path:'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  { path:'settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path:'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Buscar' } },
  { path:'estudiantes', component: EstudiantesComponent, data: { titulo: 'Administración de estudiantes' } },

  
  //Rutas protegidas para admin
  { path:'usuarios', canActivate: [AdminGuard] ,component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
  { path:'titulacion', canActivate: [AdminGuard] ,component: TitulacionComponent, data: { titulo: 'Módulo de títulos de bachiller' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
