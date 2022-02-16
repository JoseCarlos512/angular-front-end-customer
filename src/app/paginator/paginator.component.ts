import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginador: any;

  mArrPaginas: number[];

  constructor() {
    this.mArrPaginas = [];
   }

  ngOnInit(): void {
    this.mArrPaginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
  }

}
