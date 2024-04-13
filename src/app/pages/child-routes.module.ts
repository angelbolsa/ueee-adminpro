import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante.component';
import { ListadosComponent } from './gestion/listados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TitulacionComponent } from './gestion/titulacion.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { AdminGuard } from '../guards/admin.guard';
import { AsignacionComponent } from './mantenimientos/estudiantes/asignacion.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { CursoComponent } from './mantenimientos/cursos/curso.component';

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { titulo: 'Dashboard' }, },
  
  //Rutas propias del usuario logeado
  { path:'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  { path:'settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path:'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Buscar' } },
  
  //Rutas de gestión

  { path:'gestion/listados', component: ListadosComponent, data: { titulo: 'Gestión de listados de estudiantes' } },
  { path:'gestion/titulacion', canActivate: [AdminGuard] ,component: TitulacionComponent, data: { titulo: 'Módulo de títulos de bachiller' } },

  //Rutas de estudiantes

  { path:'estudiantes/:id', component: EstudianteComponent, data: { titulo: 'Administración de datos de estudiantes' } },
  { path:'asignacion', component: AsignacionComponent, data: { titulo: 'Asignación de estudiantes' } },

  //Rutas de cursos

  { path:'cursos', component: CursosComponent, data: { titulo: 'Administración de cursos' } },
  { path:'cursos/:id', component: CursoComponent, data: { titulo: 'Administración de información de curso' } },
  
  //Rutas protegidas para admin
    
  { path:'usuarios', canActivate: [AdminGuard] ,component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
