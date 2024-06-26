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
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styles: [
  ]
})

export class ImcComponent implements OnInit {

  public registroImcForm: FormGroup;
  public estudianteSeleccionado: Estudiante;
  public datosAsignacion: any;
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
        } );

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

        const fecha = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')

    this.registroImcForm = this.fb.group({
      cedula: [{value: '', disabled: true}, Validators.required, ],
      apellidos: [{value: '', disabled: true}, Validators.required],
      nombres: [{value: '', disabled: true}, Validators.required],
      f_nac: [{value: '', disabled: true}, Validators.required],
      sexo: [{value: '', disabled: true}, Validators.required],
      periodo: [ '0' , Validators.required ],
      fecha_toma: [ fecha , Validators.required ],
      peso: [ '', Validators.required ],
      talla: [ '', Validators.required ]
    });

  }

  cargarCursos(){
    const jornada = this.registroImcForm.get('jornada').value;
    const nivel = this.registroImcForm.get('nivel').value;
    
    this.cursoService.cargarCursosFiltrados(jornada, nivel)
    .subscribe(
      ({total, cursos}) =>{
        this.cursos = cursos;
      })
    }
    
  cargarEstudiante( id: string ){

    this.estudianteService.cargarEstudianteId(id)
        .subscribe( (estudiante: Estudiante) => {

          if( !estudiante ){
            return this.router.navigateByUrl(`/dashboard`);
          }

          const { cedula, apellidos, nombres, f_nac, sexo } = estudiante;

          const fecha_nacimiento: string = formatDate(f_nac,'yyyy-MM-dd','EN');

          this.estudianteService.cargarMatriculaEstudiante(id)
          .subscribe( (matricula: Matricula) => {

            if(matricula){
              this.datosAsignacion = {
                matriculaId: matricula._id,
                grado: matricula.datosCurso.grado,
                nivel: matricula.datosCurso.nivel,
                paralelo: `"${matricula.datosCurso.paralelo}"`,
                jornada: matricula.datosCurso.jornada,
                especialidad: matricula.datosCurso.especialidad? matricula.datosCurso.especialidad : ''
              };
            }else{
              this.datosAsignacion = {
                matriculaId: '0',
                grado: 'NO ASIGNADO',
                nivel: '',
                paralelo: '',
                jornada: '',
                especialidad: ''
              };
            }            
          });

          const fecha = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')

          
          const datosFormulario = {
            cedula,  
            apellidos, 
            nombres, 
            f_nac: fecha_nacimiento, 
            sexo,
            periodo: 0,
            peso: 0,
            talla: 0,
            fecha_toma: fecha
          }          
          this.estudianteSeleccionado = estudiante;
          this.registroImcForm.setValue(datosFormulario);
          return true;

        }
      )
  }

  cambiaJornada(){
    this.registroImcForm.controls['nivel'].setValue(0);
    this.cursos = [];
  }

  guardarRegistro(){

      
      this.estudianteService.registroEstudianteImc(
        this.estudianteSeleccionado._id, 
        this.registroImcForm.controls['periodo'].value,
        this.registroImcForm.controls['peso'].value,
        this.registroImcForm.controls['talla'].value,
        this.registroImcForm.controls['fecha_toma'].value)
        .subscribe( resp => {
          Swal.fire('Asignado', `Registro realizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/estudiantes/perfil`);
        } )

    }
      
  reset(){    
    this.registroImcForm.reset();
  }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
