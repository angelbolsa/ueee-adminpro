import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay, map, pipe } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante.model';
import { formatDate } from '@angular/common';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../services/estudiante.service';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Matricula } from 'src/app/models/matricula.model';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styles: [
  ]
})

export class AsignacionComponent implements OnInit {

  public asignacionForm: FormGroup;
  public estudianteSeleccionado: Estudiante;
  public matriculaEstudianteSeleccionado: Matricula;
  public cursos: Curso[] = [];

  public imgSubs: Subscription;

  constructor(private fb: FormBuilder,
              private estudianteService: EstudianteService,
              private cursoService: CursoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => {
          this.cargarEstudiante(id);
          this.cargarMatricula(id);
        } );

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

    this.asignacionForm = this.fb.group({
      cedula: [{value: '', disabled: true}, Validators.required, ],
      apellidos: [{value: '', disabled: true}, Validators.required],
      nombres: [{value: '', disabled: true}, Validators.required],
      f_nac: [{value: '', disabled: true}, Validators.required],
      sexo: [{value: '', disabled: true}, Validators.required],
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ],
      cursoSeleccionado: [ '0', Validators.required ]
    });

    

  }

  cargarCursos(){
    const jornada = this.asignacionForm.get('jornada').value;
    const nivel = this.asignacionForm.get('nivel').value;
    
    this.cursoService.cargarCursosFiltrados(jornada, nivel)
    .subscribe(
      ({total, cursos}) =>{
        this.cursos = cursos;
      })
    }
    
    cargarMatricula( id: string ){
      
    }


  cargarEstudiante( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this.estudianteService.cargarEstudianteId(id)
        .subscribe( (estudiante: Estudiante) => {

          if( !estudiante ){
            return this.router.navigateByUrl(`/dashboard/gestion/listados`);
          }

          const { cedula, apellidos, nombres, f_nac, sexo
                  
           } = estudiante;

          const fecha_nacimiento: string = formatDate(f_nac,'yyyy-MM-dd','EN');

          this.estudianteService.cargarMatriculaEstudiante(id)
          .subscribe( (matricula: Matricula) => {
            this.matriculaEstudianteSeleccionado = matricula;
            const { datosCurso } = matricula;

            const datosFormulario = {
              cedula,  
              apellidos, 
              nombres, 
              f_nac: fecha_nacimiento, 
              sexo,
              jornada: 0,
              nivel: 0,
              cursoSeleccionado: 0
          }          
            this.estudianteSeleccionado = estudiante;
            this.asignacionForm.setValue(datosFormulario);
    
          });

          return true;

        }
      )
  }

  cambiaJornada(){
    this.asignacionForm.controls['nivel'].setValue(0);
    this.cursos = [];
  }

  guardarEstudiante(){
  }

  reset(){    
    this.asignacionForm.reset();
  }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
