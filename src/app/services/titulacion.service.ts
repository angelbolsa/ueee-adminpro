import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Cliente } from '../models/cliente.model';
import { Estudiante } from '../models/estudiante.model';

import { CargarEstudiante } from '../interfaces/estudiante.interface';

import { CargarTitulacion } from '../interfaces/titulacion.interface';
import { Titulacion } from '../models/titulacion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TitulacionService {

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

  cargarTituladosPorCurso(periodo: string, curso: string, desde: number = 0, limite: number = 0){
    const url = `${ base_url}/titulacion/estudiantes/${curso}?periodo=${periodo}&from=${desde}&limit=${limite}`;
    return this.http.get<CargarTitulacion>(url, this.headers )
      .pipe(
        map( resp => {
          const titulados = resp.titulados.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            titulado => new Titulacion(titulado.dataEstudiante, titulado.nota_grado, titulado.acta_public_id, titulado.acta_secure_url, titulado.titulo_public_id, titulado.titulo_secure_url, titulado.estado, titulado._id)
          );
          return {
            total: resp.total,
            titulados
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

  crearCliente( cliente: Cliente)
  {
    const url = `${ base_url}/clientes`;
    return this.http.post(url, cliente , this.headers );
  }

  actualizarEstudiante( estudiante: Estudiante)
  {
    const url = `${ base_url}/estudiantes/${estudiante._id}`;
    return this.http.put(url, estudiante, this.headers );
  }

  eliminarCliente( _id: string)
  {
    const url = `${ base_url}/clientes/${_id}`;
    return this.http.delete(url, this.headers );
  }


}


