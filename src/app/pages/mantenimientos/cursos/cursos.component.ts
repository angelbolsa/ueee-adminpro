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
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: [
  ]
})

export class CursosComponent implements OnInit {

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
      grado_abrev: ['', Validators.required],
      nivel: ['', Validators.required],
      nivel_abrev: ['', Validators.required],
      paralelo: ['', Validators.required],
      jornada: ['', Validators.required],
      especialidad: ['' ]
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

          const { 
            grado,
            grado_abrev,
            orden,
            nivel,
            nivel_abrev,
            paralelo,
            jornada,
            especialidad
          } = curso;
          
          this.cursoSeleccionado = curso;
          this.cursoForm.setValue({
            grado,
            grado_abrev,
            orden,
            nivel,
            nivel_abrev,
            paralelo,
            jornada,
            especialidad
          });
  
          return true;
        }
      )
  }

  guardarCurso(){

    const { 
      grado,
            grado_abrev,
            orden,
            nivel,
            nivel_abrev,
            paralelo,
            jornada,
            especialidad 
    } = this.cursoForm.value;

    if(this.cursoSeleccionado){
      const cid = this.cursoSeleccionado._id;
      const data = {
        //van todos los campos del formulario más el id del curso seleccionado
        _id: cid,
        ...this.cursoForm.value,        
      }
      this.cursoService.actualizarCurso(data)
          .subscribe(
            resp => {
              Swal.fire('Actualizado', `El curso ha sido actualizado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/cursos/`);
            }
          )
    }else{
      
    this.cursoService.crearCurso(this.cursoForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Creado', `El curso ha sido creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/cursos/`);
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
