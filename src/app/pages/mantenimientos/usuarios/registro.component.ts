import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  public registroForm: FormGroup;


  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
      });
  }

  guardarRegistro(){
    this._usuarioService.crearUsuario(this.registroForm.value)
      .subscribe(
        (resp: any) => {
          Swal.fire('Creado', `El usuario ha sido creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/usuarios`);
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error' );
        }
      )
  }

}
