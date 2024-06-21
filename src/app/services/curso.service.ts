import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Cliente } from '../models/cliente.model';
import { Estudiante } from '../models/estudiante.model';

import { CargarEstudiante } from '../interfaces/estudiante.interface';
import { CargarEnrolamiento } from '../interfaces/enrolamiento.interface';
import { Enrolamiento } from '../models/enrolamiento.model';
import { CargarCurso } from '../interfaces/curso.interface';
import { Curso } from '../models/curso.model';
import { TotalesOferta } from '../interfaces/totalesOferta.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }
  
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
        headers:{
        'x-token': this.token
      }
    }
  }

  cargarCursoPorID( id: string){
    const url = `${ base_url}/cursos/${id}`;

    return this.http.get(url, this.headers )
    .pipe(
      map( (resp: any) => resp.curso )   
    )
    
  }

  cargarOfertaActiva(jornada: string){
    const url = `${ base_url}/cursos/oferta/${jornada}`;

    return this.http.get(url, this.headers )
    .pipe(
      map( (resp: any) => resp.oferta )   
    )
    
  }

  cargarTotalesOfertaActiva(jornada: string){
    const url = `${ base_url}/cursos/oferta/totales/${jornada}`;

    return this.http.get<TotalesOferta>(url, this.headers )
    .pipe(
      map( resp => {
        return {
          totalCursos: resp.totalCursos,
          totalEstudiantes: resp.totalEstudiantes
        }
      }
      )
    )
  }

  cargarCursosFiltrados(jornada: number = 0, nivel: number = 0)
  {
    const url = `${ base_url}/cursos/listado/filtro?jor=${jornada}&niv=${nivel}`;

    return this.http.get<CargarCurso>(url, this.headers )
      .pipe(
        map( resp => {
          const cursos = resp.cursos.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            curso => new Curso(curso.grado, curso.grado_abrev, 
              curso.orden, curso.nivel, curso.nivel_abrev, 
              curso.paralelo, curso.jornada, curso.usuario, 
              curso.estado, curso.especialidad, curso._id)
          );
          return {
            total: resp.total,
            cursos
          };
        })
      )
  }

  cargarCursosFiltradosTitulacion(jornada: number = 0, nivel: number = 0)
  {
    const url = `${ base_url}/cursos/listado/titulacion/filtro?jor=${jornada}`;

    return this.http.get<CargarCurso>(url, this.headers )
      .pipe(
        map( resp => {
          const cursos = resp.cursos.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            curso => new Curso(curso.grado, curso.grado_abrev, 
              curso.orden, curso.nivel, curso.nivel_abrev, 
              curso.paralelo, curso.jornada, curso.usuario, 
              curso.estado, curso.especialidad, curso._id)
          );
          return {
            total: resp.total,
            cursos
          };
        })
      )
  }

  crearCurso( curso: Curso)
  {
    const url = `${ base_url}/cursos`;
    return this.http.post(url, curso , this.headers );
  }

  actualizarCurso( curso: Curso)
  {
    const url = `${ base_url}/cursos/${curso._id}`;
    return this.http.put(url, curso, this.headers );
  }

}


