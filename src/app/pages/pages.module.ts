import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TitulacionComponent } from './titulacion/titulacion.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    BusquedaComponent,
    DashboardComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    TitulacionComponent,
    EstudiantesComponent
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
