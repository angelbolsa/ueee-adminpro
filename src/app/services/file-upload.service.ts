import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'clientes'|'actas'|'titulos',
    id: string
  ) {

    try {

      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('image', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      console.log(data);
      if ( data.ok ) {
        //TENER CUIDADO CON EL NOMBRE DE LOS CAMPOS DEVUELTOS EN LA RESPUESTA DEL BACKEND
        console.log('Okkkkkkkkkkk');
        return data.fileName;
      } else {
        console.log('Errooooooooor');
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;    
    }
  }
}
