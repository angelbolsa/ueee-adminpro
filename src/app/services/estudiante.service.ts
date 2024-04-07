import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Cliente } from '../models/cliente.model';
import { Estudiante } from '../models/estudiante.model';

import { CargarEstudiante } from '../interfaces/estudiante.interface';
import { CargarEnrolamiento } from '../interfaces/enrolamiento.interface';
import { Enrolamiento } from '../models/enrolamiento.model';

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
            estudiante => new Estudiante(estudiante.cedula, estudiante.apellidos, estudiante.nombres, estudiante.f_nac, estudiante.sexo, estudiante.img, estudiante.estado, estudiante.usuario, estudiante._id)
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

    console.log(url);
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

  cargarClientePorId( id: string )
  {
    const url = `${ base_url}/clientes/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, cliente: Cliente}) => resp.cliente )   
      )
  }

  crearCliente( cliente: Cliente)
  {
    const url = `${ base_url}/clientes`;
    return this.http.post(url, cliente , this.headers );
  }

  actualizarCliente( cliente: Cliente)
  {
    const url = `${ base_url}/clientes/${cliente._id}`;
    return this.http.put(url, cliente, this.headers );
  }

  eliminarCliente( _id: string)
  {
    const url = `${ base_url}/clientes/${_id}`;
    return this.http.delete(url, this.headers );
  }


}


