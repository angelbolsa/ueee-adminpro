import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Estudiante } from 'src/app/models/estudiante.model';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Enrolamiento } from 'src/app/models/enrolamiento.model';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-titulacion',
  templateUrl: './titulacion.component.html',
  styles: [
  ]
})
export class TitulacionComponent implements OnInit, OnDestroy {
  
  public totalEstudiantes: number;
  public estudiantesListado: Enrolamiento[] = [];
  public estudiantesListadoTemp: Enrolamiento[] = [];
  public cursos: Curso[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;

  constructor( private estudianteService: EstudianteService,
               private cursoService: CursoService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.imgSubs = this.imgSubs = this.modalImagenSrv.imagenCambio
      .pipe(
        delay(200)
      )
      .subscribe(img => this.cargarEstudiantesPorCurso(''));
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  cargarEstudiantesPorCurso(curso: string){
    this.cargando = true;
    this.estudianteService.cargarEstudiantesPorCurso(curso)
      .subscribe(
        ({total, enrolamientos}) =>{
          this.totalEstudiantes = total;
          this.estudiantesListado = enrolamientos;
          this.estudiantesListadoTemp = enrolamientos;
          this.cargando = false;
        })
  }
  
  cargarCursos( jornada: number){
    this.cursoService.cargarCursosFiltrados(jornada)
      .subscribe(
        ({total, cursos}) =>{
          this.cursos = cursos;
        })
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalEstudiantes){
      this.desde -= valor;
    }
    this.cargarEstudiantesPorCurso('');
  }

  buscar( busqueda: string){
  }

  eliminarEstudiante(enrolamiento: Enrolamiento){

  }

  abrirModal(usuario: Usuario){
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
