import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Enrolamiento } from 'src/app/models/enrolamiento.model';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styles: [
  ]
})

export class ListadosComponent implements OnInit, OnDestroy {
  
  public totalEstudiantes: number;
  public estudiantesListado: Enrolamiento[] = [];
  public estudiantesListadoTemp: Enrolamiento[] = [];
  public cursos: Curso[] = [];
  public cursoSeleccionado: string;
  public nivelUsuario;

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
               private modalImagenSrv: ModalImagenService,
               private usuarioService: UsuarioService){}

  ngOnInit(): void {

      this.seleccionForm = this.fb.group({
        jornada: [ '0' , Validators.required ],
        nivel: [ '0', Validators.required ],
        cursoSeleccionado: [ '0', Validators.required ]
      });

      this.nivelUsuario = this.usuarioService.role;
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
    this.estudianteService.cargarEstudiantesPorCurso(curso)
      .subscribe(
        ({total, enrolamientos}) =>{
          this.totalEstudiantes = total;
          this.estudiantesListado = enrolamientos;
          this.estudiantesListadoTemp = enrolamientos;
          this.cargando = false;
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
  
  buscar( busqueda: string){
  }

  eliminarEstudiante(enrolamiento: Enrolamiento){

  }

  generarPDF(){
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    console.log(this.estudiantesListado);
    
    pdf.add(this.estudiantesListado.values['cedula']);

    
    
    pdf.create().open();
  }

  abrirModal(usuario: Usuario){
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
