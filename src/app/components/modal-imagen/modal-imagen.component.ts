import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})

export class ModalImagenComponent {
  public archivoSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenSvr: ModalImagenService,
               public fileUploadSrv: FileUploadService){

  }
  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenSvr.cerrarModal();
  }

  cambiarImagen( file: File ) {
    this.archivoSubir = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirArchivo() {

    const tipo = this.modalImagenSvr.tipo;
    const id   = this.modalImagenSvr.id;

    this.fileUploadSrv
      .actualizarFoto( this.archivoSubir, tipo, id)
      .then( img => {
        Swal.fire('Guardado', 'Archivo cargado correctamente', 'success');
        this.modalImagenSvr.imagenCambio.emit(img);
        this.cerrarModal();
      })
      .catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }
}
