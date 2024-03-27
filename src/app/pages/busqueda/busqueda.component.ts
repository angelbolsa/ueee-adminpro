import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
import { Cliente } from 'src/app/models/cliente.model';

import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{

  public usuariosEncontrados: Usuario[] = [];
  public clientesEncontrados: Cliente[] = [];
  

  constructor( private activatedRoute: ActivatedRoute,
               private busquedaSrv: BusquedasService){}

               
  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ termino }) => this.busquedaGlobal(termino) )
  }

  busquedaGlobal( termino: string){
    this.busquedaSrv.buscarTodo(termino)
        .subscribe( (resp: any) => {
          this.usuariosEncontrados = resp.coincidenciasUsuario;
          this.clientesEncontrados = resp.coincidenciasCliente;
        } )
  }

}
