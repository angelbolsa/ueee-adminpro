import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Curso } from 'src/app/models/curso.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { CursoService } from 'src/app/services/curso.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit, OnDestroy{

  public totalCursos: number;
  public cursos: Curso[] = [];
  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public niveles: string[] = ['EGB SUPERIOR', 'BACHILLERATO GENERAL UNIFICADO', 'BACHILLERATO TECNICO'];
  public nivelUsuario;

  public seleccionForm: FormGroup;

  constructor( private cursoService: CursoService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService,
               private usuarioService: UsuarioService,
               private fb: FormBuilder){}

  ngOnInit(): void {
    this.seleccionForm = this.fb.group({
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ]
    });

    this.nivelUsuario = this.usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarCursos(){
    const jornada = this.seleccionForm.get('jornada').value;
    const nivel = this.seleccionForm.get('nivel').value;
    if(jornada>0 && nivel>0){
      this.cargando = true;
      this.cursoService.cargarCursosFiltrados(jornada, nivel)
      .subscribe(
        ({total, cursos}) =>{
          this.totalCursos = total;
          this.cursos = cursos;
          this.cargando = false;
        }) 
    }else{
      this.cursos = [];
    }
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalCursos){
      this.desde -= valor;
    }
    this.cargarCursos();
  }

  cambiaJornada(){
    this.seleccionForm.controls['nivel'].setValue(0);
    this.cursos = [];
  }

  // buscar(termino: string){

  //   if(termino.length === 0){
  //     return this.cursos = this.cursosTemp;
  //   }

  //   this.busquedasSrv.buscar('usuarios', termino)
  //     .subscribe(
  //       (resp: Curso[]) => {
  //         this.cursos = resp;
  //       });
  //     return true;
  // }

  // eliminarUsuario(usuario: Usuario){

  //   Swal.fire({
  //     title: '¿Está seguro de eliminar el curso?',
  //     text: `Está a punto de borrar el curso`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, elimínalo!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.cursoService.elimi(usuario)
  //         .subscribe( resp => {
  //           this.cargarCursos();
  //           Swal.fire(
  //             'Usuario borrado.',
  //             `${ usuario.nombre } fue eliminado corréctamente`,
  //             'success'
  //           )
  //         })  
  //     }
  //   })
  //   return true;
  // }

  // abrirModal(usuario: Usuario){
  //   this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  // }
}
