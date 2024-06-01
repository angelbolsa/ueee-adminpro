import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { Estudiante } from '../models/estudiante.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  

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

  private transformarUsuarios( resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.uid)
    );
  }

  private transformarEstudiantes( resultados: any[]): any[]{
    return resultados.map(
      estudiante => new Estudiante(estudiante.cedula, estudiante.apellidos, estudiante.nombres, estudiante.f_nac, estudiante.sexo)
    );
  }
  
  buscarTodo(  termino: string){
    console.log(termino);
    const url = `${base_url}/busqueda/${termino}`;
      return this.http.get(url, this.headers )
  }

  buscar( tipo: 'usuarios'|'estudiantes'|'temas', termino: string){
    const url = `${base_url}/busqueda/${ tipo }/${termino}`;
    return this.http.get<any[]>(url, this.headers )
      .pipe( 
        //se debe tener cuidado en el nombre asignado en el backend para la respuesta 
        //de los datos y que los datos vengan tal como se los requiere sin filtro en el backend
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.data);
            case 'estudiantes':
              return this.transformarEstudiantes(resp.data);             
            default:
              return[];
          }
        }) 
      );
  }

}
