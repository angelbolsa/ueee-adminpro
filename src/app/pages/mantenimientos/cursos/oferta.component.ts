import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html'
})
export class OfertaComponent implements OnInit {

  public ofertaActiva: any = [];

  constructor(private _cursoService: CursoService) { }

  ngOnInit() {
    this.cargarOfertaActiva();
  }

  cargarOfertaActiva(){
    this._cursoService.cargarOfertaActiva()
      .subscribe(
        oferta => {
          this.ofertaActiva = oferta;
          console.log(this.ofertaActiva);
        }
      )
  }

}
