import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Cliente } from '../models/cliente.model';
import { Estudiante } from '../models/estudiante.model';

import { CargarEstudiante } from '../interfaces/estudiante.interface';
import { CargarEnrolamiento } from '../interfaces/enrolamiento.interface';
import { Enrolamiento } from '../models/enrolamiento.model';
import { Matricula } from '../models/matricula.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

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

  cargarEstudiantes(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/estudiantes?from=${desde}&limit=${limite}`;

    return this.http.get<CargarEstudiante>(url, this.headers )
      .pipe(
        map( resp => {
          const estudiantes = resp.estudiantes.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            estudiante => new Estudiante(estudiante.cedula, estudiante.apellidos, estudiante.nombres, estudiante.f_nac,estudiante.sexo, estudiante.img, estudiante.estado, estudiante.usuario,
              estudiante.ciudad,estudiante.direccion, estudiante.celular, estudiante.email,
              estudiante.discapacidad, estudiante.discapacidad_detalle, estudiante.enfermedad_catastrofica, estudiante. enfermedad_catastrofica_detalle,
              estudiante.alergia, estudiante.alergia_detalle, estudiante.embarazo, estudiante.embarazo_fecha,
              estudiante.representante_cedula, estudiante.representante_nombre_completo, estudiante.representante_celular, estudiante.representante_email,
              estudiante.madre_cedula, estudiante.madre_nombre_completo, estudiante.madre_celular, estudiante.madre_email,
              estudiante.padre_cedula, estudiante.padre_nombre_completo, estudiante.padre_celular, estudiante.padre_email,
              estudiante._id)
          );
          return {
            total: resp.total,
            estudiantes
          };
        })
      )
  }

  cargarEstudiantesPorCurso(curso: string, desde: number = 0, limite: number = 0){
    const url = `${ base_url}/estudiantes/listado/${curso}?from=${desde}&limit=${limite}`;
    return this.http.get<CargarEnrolamiento>(url, this.headers )
      .pipe(
        map( resp => {
          const enrolamientos = resp.enrolamientos.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            enrolamiento => new Enrolamiento(enrolamiento.periodo, enrolamiento.estudiante, enrolamiento.curso, enrolamiento.usuario, enrolamiento.estado, enrolamiento._id)
          );
          return {
            total: resp.total,
            enrolamientos
          };
        })
      )
  }

  cargarEstudianteId( id: string )
  {
    const url = `${ base_url}/estudiantes/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, estudiante: Estudiante}) => resp.estudiante )   
      )
  }

  cargarMatriculaEstudiante( id: string )
  {
    const url = `${ base_url}/estudiantes/matricula/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, matricula: Matricula}) => resp.matricula[0] )   
      )
  }

  crearEstudiante( estudiante: Estudiante )
  {
    const url = `${ base_url}/estudiantes`;
    return this.http.post(url, estudiante , this.headers );
  }

  actualizarEstudiante( estudiante: Estudiante )
  {
    const url = `${ base_url}/estudiantes/${estudiante._id}`;
    return this.http.put(url, estudiante, this.headers );
  }

  asignarEstudianteCurso( idEstudiante: string, idCurso: string, idMatricula?:string)
  {
    const url = `${ base_url}/estudiantes/asignacion/${idEstudiante}`;
    return this.http.put(url, { curso: idCurso, matricula: idMatricula} , this.headers );
  }

  eliminarCliente( _id: string )
  {
    const url = `${ base_url}/clientes/${_id}`;
    return this.http.delete(url, this.headers );
  }

}


