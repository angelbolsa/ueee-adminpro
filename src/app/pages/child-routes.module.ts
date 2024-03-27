import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminGuard } from '../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { titulo: 'Dashboard' }, },
  
  //Rutas propias del usuario logeado
  { path:'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  { path:'settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path:'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Buscar' } },
  
  //Rutas protegidas para admin
  { path:'usuarios', canActivate: [AdminGuard] ,component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
