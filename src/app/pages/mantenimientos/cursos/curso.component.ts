import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante.model';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../services/estudiante.service';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styles: [
  ]
})

export class CursoComponent implements OnInit {

  public cursoForm: FormGroup;
  public cursoSeleccionado: Curso;

  public imgSubs: Subscription;

  public grados: string[] = ['8VO GRADO', '9NO GRADO', '10MO GRADO', '1ER CURSO', '2DO CURSO', '3ER CURSO'];
  public grados_abrev: string[] = ['8VO', '9NO', '10MO', '1ER BACH.', '2DO BACH.', '3ER BACH.'];
  public ordenes: number = 0;
  public niveles: string[] = ['EGB SUPERIOR', 'BACHILLERATO GENERAL UNIFICADO', 'BACHILLERATO TECNICO'];
  public niveles_abrev: string[] = ['INI', 'EGB ELEM.', 'EGB MED.', 'EGB SUP.', 'BGU', 'BT'];
  public paralelos: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  public jornadas: string[] = ['MATUTINA', 'VESPERTINA', 'NOCTURNA'];
  public especialidades: string[] = ['CONTABILIDAD', 'INFORMATICA', 'ELECTROMECANICA'];

  constructor(private fb: FormBuilder,
              private cursoService: CursoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

    
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarCurso(id);
          }
        } );

    this.cursoForm = this.fb.group({
      grado: ['', Validators.required],
      nivel: ['', Validators.required],
      paralelo: ['', Validators.required],
      jornada: ['', Validators.required],
      especialidad: [''],
      orden: ['']
    });
  }



  cargarCurso( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this.cursoService.cargarCursoPorID(id)
        .subscribe( (curso: Curso) => {

          if( !curso ){
            return this.router.navigateByUrl(`/dashboard/cursos`);
          }

          this.cursoSeleccionado = curso;
          var orden: number;
          if(!this.cursoSeleccionado.orden){
            orden = 0;
          }else{
            orden = this.cursoSeleccionado.orden;
          }
          if(curso.especialidad)
            {
              this.cursoForm.setValue({
                grado: this.cursoSeleccionado.grado,
                nivel: this.cursoSeleccionado.nivel,
                paralelo: this.cursoSeleccionado.paralelo,
                jornada: this.cursoSeleccionado.jornada,
                especialidad: this.cursoSeleccionado.especialidad,
                orden
              });
            }else{
              this.cursoForm.setValue({
                grado: this.cursoSeleccionado.grado,
                nivel: this.cursoSeleccionado.nivel,
                paralelo: this.cursoSeleccionado.paralelo,
                jornada: this.cursoSeleccionado.jornada,
                orden,
                especialidad: ''
              });
            }       
          return true;
        }
      )
  }

  guardarCurso(){

    const { 
        grado,
        nivel,
        paralelo,
        jornada,
        especialidad 
    } = this.cursoForm.value;

    var grado_abrev = ''
    //enum: ['8VO', '9NO', '10MO', '1ER BACH.', '2DO BACH.', '3ER BACH.'],
    switch (grado) {
      case '8VO GRADO':
        grado_abrev = '8VO'
        break;
      case '9NO GRADO':
        grado_abrev = '9NO'
        break;
      case '10MO GRADO':
        grado_abrev = '10MO'
        break;
      case '1ER CURSO':
        grado_abrev = '1ER BACH.'
        break;
      case '2DO CURSO':
        grado_abrev = '2DO BACH.'
        break;
      case '3ER CURSO':
        grado_abrev = '3ER BACH.'
        break;
    }

    var nivel_abrev = ''

    switch (nivel) {
      case 'EGB SUPERIOR':
        nivel_abrev = 'EGB SUP.'
        break;
      case 'BACHILLERATO GENERAL UNIFICADO':
        nivel_abrev = 'BGU'
        break;
      case 'BACHILLERATO TECNICO':
        nivel_abrev = 'BT'
        break;
    }

    if(this.cursoSeleccionado){
      const cid = this.cursoSeleccionado._id;
      const data = {
        _id: cid,
        grado_abrev,
        nivel_abrev,
        ...this.cursoForm.value,        
      }
  
      this.cursoService.actualizarCurso(data)
          .subscribe(
            resp => {
              Swal.fire('Actualizado', `El curso ha sido actualizado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/cursos`);
            }
          )
    }else{
 
    const data = {
      grado_abrev,
      nivel_abrev,
      ...this.cursoForm.value        
    }

    this.cursoService.crearCurso(data)
      .subscribe(
        (resp: any) => {
          Swal.fire('Creado', `El curso ha sido creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/cursos`);
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error' );
        }
      )
    }    
  }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
