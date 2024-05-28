import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante.model';
import { formatDate } from '@angular/common';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styles: [
  ]
})
export class AsignacionComponent implements OnInit {

  public estudianteForm: FormGroup;
  public estudianteSeleccionado: Estudiante;

  public imgSubs: Subscription;

  constructor(private fb: FormBuilder,
              private estudianteService: EstudianteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => {
          this.estudianteService.cargarEstudianteId(id)
          .subscribe( (estudiante: Estudiante) => {
  
            if( !estudiante ){
              return this.router.navigateByUrl(`/dashboard`);
            }
  
            this.estudianteSeleccionado = estudiante;
  
            return true;
          }
        )
        } );

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
  }

  guardarEstudiante(){

   
  }

  reset(){    
    this.estudianteForm.reset();
  }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
