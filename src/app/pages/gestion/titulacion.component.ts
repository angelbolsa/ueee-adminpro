import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Enrolamiento } from 'src/app/models/enrolamiento.model';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitulacionService } from 'src/app/services/titulacion.service';
import { Titulacion } from 'src/app/models/titulacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-titulacion',
  templateUrl: './titulacion.component.html',
  styles: [
  ]
})

export class TitulacionComponent implements OnInit, OnDestroy {
  
  public totalEstudiantes: number;
  public estudiantesListado: Titulacion[] = [];
  public estudiantesListadoTemp: Titulacion[] = [];
  public cursos: Curso[] = [];
  public cursoSeleccionado: string;

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;

  public periodo: string;
  public jornada: string;
  public nivel: string;

  public seleccionForm: FormGroup;

  constructor( 
               private fb: FormBuilder,
               private titulacionService: TitulacionService,
               private cursoService: CursoService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

      this.seleccionForm = this.fb.group({
        periodo: [ '0' , Validators.required ],
        jornada: [ '0' , Validators.required ],
        nivel: [ '0', Validators.required ],
        cursoSeleccionado: [ '0', Validators.required ]
      });
  }

  ngOnDestroy(): void {
  }

  cargarEstudiantesPorCurso(){
    this.cargando = true;
    const curso = this.seleccionForm.get('cursoSeleccionado').value;
    this.cursoService.cargarCursoPorID(curso)
      .subscribe(
        (curso) => {
          this.cursoSeleccionado = `${curso.grado} ${curso.nivel} PARALELO "${curso.paralelo}"`;
          if(curso.especialidad){
            this.cursoSeleccionado = this.cursoSeleccionado + ` ESPECIALIDAD ${curso.especialidad}`
          }
          this.cursoSeleccionado = this.cursoSeleccionado + ` JORNADA ${curso.jornada}`
        } 
      );
    const periodo = this.seleccionForm.get('periodo').value;

    this.titulacionService.cargarTituladosPorCurso(periodo, curso)
      .subscribe(
        ({total, titulados}) =>{
          this.totalEstudiantes = total;
          this.estudiantesListado = titulados;
          this.estudiantesListadoTemp = titulados;
          this.cargando = false;
        });
  }
  
  cargarCursos(){
    const periodo = this.seleccionForm.get('periodo').value;
    const jornada = this.seleccionForm.get('jornada').value;

    this.cursoService.cargarCursosFiltradosTitulacion(jornada)
      .subscribe(
        ({total, cursos}) =>{
          this.cursos = cursos;
        })
  }
  buscar( busqueda: string){
  }

  eliminarEstudiante(enrolamiento: Enrolamiento){

  }

  modalSubirTitulo(idTitulacion: string){
    this.modalImagenSrv.abrirModal( 'titulos', idTitulacion, '');
  }

  modalSubirActa(idTitulacion: string){
    this.modalImagenSrv.abrirModal( 'actas', idTitulacion, '');
  }
}
