import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudianteComponent } from './mantenimientos/estudiantes/estudiante.component';
import { ListadosComponent } from './gestion/listados.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TitulacionComponent } from './gestion/titulacion.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { AsignacionComponent } from './mantenimientos/estudiantes/asignacion.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import { CursoComponent } from './mantenimientos/cursos/curso.component';
import { PerfilEstudiantilComponent } from './mantenimientos/estudiantes/perfil-estudiantil.component';
import { AsignacionesComponent } from './mantenimientos/estudiantes/asignaciones.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    AsignacionComponent,
    AsignacionesComponent,
    BusquedaComponent,
    CursoComponent,
    CursosComponent,
    DashboardComponent,
    EstudianteComponent,
    ListadosComponent,
    PagesComponent,
    PerfilComponent,
    PerfilEstudiantilComponent,
    TitulacionComponent,
    UsuariosComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,   
  ]
})
export class PagesModule { }
