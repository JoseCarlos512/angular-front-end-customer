import { Component, Input, /*OnInit,*/ OnChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements /*OnInit,*/ OnChanges {

  @Input() paginador: any;

  mArrPaginas: number[];
  desde: number = 0;
  hasta: number = 0;

  constructor() {
    this.mArrPaginas = [];
   }

  /*ngOnInit(): void {
    this.mArrPaginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
  }*/

  ngOnChanges() {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      this.mArrPaginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.mArrPaginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
