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
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [
  ]
})

export class EstudianteComponent implements OnInit {

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
        .subscribe( ({id}) => this.cargarEstudiante(id) );

    this.estudianteForm = this.fb.group({
      cedula: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      f_nac: ['', Validators.required],
      sexo: ['', Validators.required],
      ciudad: [''],
      direccion: [''],
      celular: [''],
      email: ['']
    });
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

          const { cedula, apellidos, nombres, f_nac, sexo, ciudad, direccion, celular, email } = estudiante;
          const fecha: string = formatDate(f_nac,'yyyy-MM-dd','EN');
          
          const datosFormulario = {
            cedula,  
            apellidos, 
            nombres, 
            f_nac: fecha, 
            sexo, 
            ciudad: ciudad ? estudiante.ciudad : null, 
            direccion: direccion ? estudiante.direccion : null, 
            celular: celular ? estudiante.celular : null, 
            email: email ? estudiante.email : null
          }          
          
          this.estudianteSeleccionado = estudiante;
          this.estudianteForm.setValue(datosFormulario);
  
          return true;
        }
      )
  }

  guardarEstudiante(){

    const { apellidos, nombres } = this.estudianteForm.value;

    if(this.estudianteSeleccionado){
      const cid = this.estudianteSeleccionado._id;
      const data = {
        //van todos los campos del formulario más el id del cliente seleccionado
        _id: cid,
        ...this.estudianteForm.value,        
      }
      this.estudianteService.actualizarEstudiante(data)
          .subscribe(
            resp => {
              Swal.fire('Actualizado', `${ apellidos } ${ nombres } actualizado corréctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/gestion/listados`);
            }
          )
    }else{
      
    this.estudianteService.crearCliente(this.estudianteForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Creado', `${ apellidos } ${ nombres } creado corréctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/gestion/listados`);
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
