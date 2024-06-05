import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CursoComponent } from './mantenimientos/cursos/curso.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante.component';
import { ListadosComponent } from './gestion/listados.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilEstudiantilComponent } from './mantenimientos/estudiantes/perfil-estudiantil.component';
import { TitulacionComponent } from './gestion/titulacion.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { AdminGuard } from '../guards/admin.guard';
import { AsignacionComponent } from './mantenimientos/estudiantes/asignacion.component';
import { AsignacionesComponent } from './mantenimientos/estudiantes/asignaciones.component';

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
  //Si deseamos usar enlaces sin parámetros debemos ubicarlos antes de los que usan parámetros
  { path:'estudiantes/asignacion', canActivate: [AdminGuard] ,component: AsignacionesComponent, data: { titulo: 'Asignación de estudiantes' } },
  { path:'estudiantes/asignacion/:id', canActivate: [AdminGuard] ,component: AsignacionComponent, data: { titulo: 'Administración de asignación de estudiantes' } },
  { path:'estudiantes/perfil', component: PerfilEstudiantilComponent, data: { titulo: 'Datos de perfil estudiantil' } },
  { path:'estudiantes/:id', component: EstudianteComponent, data: { titulo: 'Administración de datos de estudiantes' } },

  //Rutas de cursos
  { path:'cursos', component: CursosComponent, data: { titulo: 'Administración de cursos' } },
  { path:'curso/:id', component: CursoComponent, data: { titulo: 'Administración de información de curso' } },
  
  //Rutas protegidas para admin
    
  { path:'usuarios', canActivate: [AdminGuard] ,component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },




]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
