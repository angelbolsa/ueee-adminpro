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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: [
  ]
})

export class EstudiantesComponent implements OnInit, OnDestroy {
  
  public totalEstudiantes: number;
  public estudiantesListado: Enrolamiento[] = [];
  public estudiantesListadoTemp: Enrolamiento[] = [];
  public cursos: Curso[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;

  public jornada: string;
  public nivel: string;

  public seleccionForm: FormGroup;

  constructor( 
               private fb: FormBuilder,
               private estudianteService: EstudianteService,
               private cursoService: CursoService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

      this.seleccionForm = this.fb.group({
        jornada: [ '0' , Validators.required ],
        nivel: [ '0', Validators.required ],
        cursoSeleccionado: [ '0', Validators.required ]
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  cargarEstudiantesPorCurso(){
    this.cargando = true;
    const curso = this.seleccionForm.get('cursoSeleccionado').value;
    console.log(curso);
    this.estudianteService.cargarEstudiantesPorCurso(curso)
      .subscribe(
        ({total, enrolamientos}) =>{
          this.totalEstudiantes = total;
          this.estudiantesListado = enrolamientos;
          this.estudiantesListadoTemp = enrolamientos;
          this.cargando = false;
          console.log(this.estudiantesListado);
        })
  }
  
  cargarCursos(){
    const jornada = this.seleccionForm.get('jornada').value;
    const nivel = this.seleccionForm.get('nivel').value;

    this.cursoService.cargarCursosFiltrados(jornada, nivel)
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
  }

  buscar( busqueda: string){
  }

  eliminarEstudiante(enrolamiento: Enrolamiento){

  }

  abrirModal(usuario: Usuario){
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
