import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante.model';
import { formatDate } from '@angular/common';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../services/estudiante.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [
  ]
})

export class EstudianteComponent implements OnInit {

  public estudianteForm: FormGroup;
  public estudianteSeleccionado: Estudiante;
  public usuarioModificacion: string;

  public imgSubs: Subscription;

  constructor(private fb: FormBuilder,
              private estudianteService: EstudianteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => this.cargarEstudiante(id) );

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

    this.estudianteForm = this.fb.group({
      cedula: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      f_nac: ['', Validators.required],
      sexo: ['', Validators.required],
      ciudad: [''],
      direccion: [''],
      celular: [''],
      email: [''],
      discapacidad: [''],
      discapacidad_detalle: [''],
      enfermedad_catastrofica: [''],
      enfermedad_catastrofica_detalle: [''],
      alergia: [''],
      alergia_detalle: [''],
      embarazo: [''],
      embarazo_fecha: [''],
      representante_cedula: [''],
      representante_nombre_completo: [''],
      representante_celular: [''],
      representante_email: [''],
      madre_cedula: [''],
      madre_nombre_completo: [''],
      madre_celular: [''],
      madre_email: [''],
      padre_cedula: [''],
      padre_nombre_completo: [''],
      padre_celular: [''],
      padre_email: [''],
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

          const { cedula, apellidos, nombres, f_nac, sexo, ciudad, direccion, celular, email,
                  discapacidad, discapacidad_detalle, enfermedad_catastrofica, enfermedad_catastrofica_detalle,
                  alergia, alergia_detalle, embarazo, embarazo_fecha, 
                  representante_cedula, representante_nombre_completo, representante_celular, representante_email,
                  madre_cedula, madre_nombre_completo, madre_celular, madre_email,
                  padre_cedula, padre_nombre_completo, padre_celular, padre_email, usuario
                  
           } = estudiante;
          const fecha_nacimiento: string = formatDate(f_nac,'yyyy-MM-dd','EN');

          this.usuarioModificacion = usuario.nombre;
          
          if(embarazo_fecha){
            var fecha_embarazo: string = formatDate(embarazo_fecha,'yyyy-MM-dd','EN');
          }else{
            var fecha_embarazo: string = "";
          }

          const datosFormulario = {
            cedula,  
            apellidos, 
            nombres, 
            f_nac: fecha_nacimiento, 
            sexo, 
            ciudad: ciudad ? estudiante.ciudad : null, 
            direccion: direccion ? estudiante.direccion : null, 
            celular: celular ? estudiante.celular : null, 
            email: email ? estudiante.email : null,
            discapacidad: discapacidad ? estudiante.discapacidad : 0,
            discapacidad_detalle: discapacidad_detalle ? estudiante.discapacidad_detalle : null,
            enfermedad_catastrofica: enfermedad_catastrofica ? estudiante.enfermedad_catastrofica : 0,
            enfermedad_catastrofica_detalle: enfermedad_catastrofica_detalle ? estudiante.enfermedad_catastrofica_detalle : null,
            alergia: alergia ? estudiante.alergia : 0,
            alergia_detalle: alergia_detalle ? estudiante.alergia_detalle : null,
            embarazo: embarazo ? estudiante.embarazo : 0,
            embarazo_fecha: fecha_embarazo,
            representante_cedula: representante_cedula ? estudiante.representante_cedula : null,
            representante_nombre_completo: representante_nombre_completo ? estudiante.representante_nombre_completo : null,
            representante_celular: representante_celular ? estudiante.representante_celular : null,
            representante_email: representante_email ? estudiante.representante_email : null,
            madre_cedula: madre_cedula ? estudiante.madre_cedula : null,
            madre_nombre_completo: madre_nombre_completo ? estudiante.madre_nombre_completo : null,
            madre_celular: madre_celular ? estudiante.madre_celular : null,
            madre_email: madre_email ? estudiante.madre_email : null,
            padre_cedula: padre_cedula ? estudiante.padre_cedula : null,
            padre_nombre_completo: padre_nombre_completo ? estudiante.padre_nombre_completo : null,
            padre_celular: padre_celular ? estudiante.padre_celular : null,
            padre_email: padre_email ? estudiante.padre_email : null,
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
      
    this.estudianteService.crearEstudiante(this.estudianteForm.value)
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

  reset(){    
    this.estudianteForm.reset();
  }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
