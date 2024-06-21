import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CursoService } from 'src/app/services/curso.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html'
})
export class OfertaComponent implements OnInit {

  public ofertaActivaMatutina: any = [];
  public ofertaActivaVespertina: any = [];
  public ofertaActivaNocturna: any = [];

  public totalCursoMatutina: number;
  public totalEstudiantesMatutina: number;
  public totalCursoVespertina: number;
  public totalEstudiantesVespertina: number;
  public totalCursoNocturna: number;
  public totalEstudiantesNocturna: number;

  public periodoActivo: string = environment.periodo_activo;

  constructor(private _cursoService: CursoService) { }

  ngOnInit() {
    this.cargarOfertaActiva();
  }

  cargarOfertaActiva(){
  
    this._cursoService.cargarTotalesOfertaActiva('MATUTINA')
      .subscribe(
        (totalesOferta) => {
          this.totalCursoMatutina = totalesOferta.totalCursos[0].curso;
          this.totalEstudiantesMatutina = totalesOferta.totalEstudiantes[0].estudiantes;
        }
      )

    this._cursoService.cargarOfertaActiva('MATUTINA')
      .subscribe(
        (oferta) => {
          this.ofertaActivaMatutina = oferta
        }
      )

    this._cursoService.cargarTotalesOfertaActiva('VESPERTINA')
      .subscribe(
        (totalesOferta) => {
          this.totalCursoVespertina = totalesOferta.totalCursos[0].curso;
          this.totalEstudiantesVespertina = totalesOferta.totalEstudiantes[0].estudiantes;
        }
      )

    this._cursoService.cargarOfertaActiva('VESPERTINA')
      .subscribe(
        (oferta) => {
          this.ofertaActivaVespertina = oferta
        }
      )

      

  }

}
