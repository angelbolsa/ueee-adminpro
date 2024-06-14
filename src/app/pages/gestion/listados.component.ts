import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper';
import * as XLSX from "xlsx";

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
import { ThisReceiver } from '@angular/compiler';

type TableRow = [number, string, string, string];

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

  generarXlsx(){
    var filename = `${this.cursoSeleccionado.toString()}.xlsx`;

    let data = document.getElementById("tabla-datos");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, 'Listado');
    XLSX.writeFile(wb, filename);
    
  }

  async generarPDF(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    
    pdf.add(
      await new Img('https://res.cloudinary.com/aabsolutions/image/upload/v1718313531/ueee/assets/t2j6vxwpehf7afvbdgv9.png')
      .width(500)
      .height(80)
      .build()
    );
    pdf.add(
      new Txt('UNIDAD EDUCATIVA EL EMPALME')
        .fontSize(15)
        .alignment('center')
        .bold().end  
    );
    pdf.add(
      new Txt('LISTADO DE ESTUDIANTES')
        .fontSize(14)
        .alignment('center')
        .bold().end 
    );
    pdf.add(
      new Txt('CURSO: ' + this.cursoSeleccionado)
        .fontSize(12)
        .alignment('left')
        .bold().end 
    );
    pdf.add(
      pdf.ln(1)
    )
    pdf.add(
      this.createTable(this.estudiantesListado)
    );
    pdf.create().open();

  }

  createTable(data: Enrolamiento[]): ITable{
    return new Table([
      [
        new Txt('No').alignment('center').bold().end,
        new Txt('IDENTIFICACIÓN').alignment('center').bold().end,
        new Txt('APELLIDOS').alignment('center').bold().end,
        new Txt('NOMBRES').alignment('center').bold().end
      ],
      ...this.extractData(data)
    ])
    .widths([20,100, '*', '*'])
      .heights((rowIndex) => (rowIndex === 0 ? 15 : 0))
      .layout({
        fillColor: (rowIndex) => {
          // row 0 is the header
          if (rowIndex === 0) {
            return '#3fb4fc';
          }

          return '#ffffff';
        },
        hLineColor: () => '#8b8c89',
        vLineWidth: () => 0,
      })
      .end;
  }

  extractData(data: Enrolamiento[]): TableRow[]{
    var i = 1;
    return data.map(
      row => [i++, row.estudiante.cedula, row.estudiante.apellidos, row.estudiante.nombres ]
    );
  }

  abrirModal(usuario: Usuario){
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
