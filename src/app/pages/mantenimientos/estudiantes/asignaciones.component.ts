import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, delay } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styles: [
  ]
})

export class AsignacionesComponent implements OnInit, OnDestroy{

  public totalEstudiantes: number;
  public estudiantes: Estudiante[] = [];
  public estudiantesTemp: Estudiante[] = [];
  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public nivelUsuario;

  constructor( private estudianteService: EstudianteService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService,
               private usuarioService: UsuarioService ){}

  ngOnInit(): void {
    this.nivelUsuario = this.usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarEstudiantes(){
    this.cargando = true;
    this.estudianteService.cargarEstudiantes(this.desde)
      .subscribe(
        ({total, estudiantes}) =>{
          this.totalEstudiantes = total;
          this.estudiantes = estudiantes;
          this.estudiantesTemp = estudiantes;
          this.cargando = false;
        })
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalEstudiantes){
      this.desde -= valor;
    }
    this.cargarEstudiantes();
  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.estudiantes = this.estudiantesTemp;
    }

    this.busquedasSrv.buscar('estudiantes_por_asignar', termino)
      .pipe(
        debounceTime(300)
      )
      .subscribe(
        //es necesario reestructurar la data recibida
        (resp: Estudiante[]) => {
          this.estudiantes = resp;
        });
      return true;
  }

  eliminarUsuario(usuario: Usuario){

    // if(usuario.uid===this.usuService.uid){
    //   return Swal.fire('Error', 'No puede borrarse a sí mismo','error');
    // }

    // Swal.fire({
    //   title: '¿Está seguro de eliminar el usuario?',
    //   text: `Está a punto de borrar a ${ usuario.nombre }`,
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sí, elimínalo!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.usuService.eliminarUsuario(usuario)
    //       .subscribe( resp => {
    //         this.cargarUsuarios();
    //         Swal.fire(
    //           'Usuario borrado.',
    //           `${ usuario.nombre } fue eliminado corréctamente`,
    //           'success'
    //         )
    //       })  
    //   }
    // })
    // return true;
  }

  cambiarRole( usuario: Usuario){
    // this.usuService.guardarUsuario(usuario)
    //   .subscribe(
        
    //   )
  }

  abrirModal(usuario: Usuario){
    // this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
