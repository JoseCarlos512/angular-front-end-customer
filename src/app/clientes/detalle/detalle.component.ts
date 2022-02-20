import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: string = "Subir Imagen";
  cliente:Cliente = new Cliente();

  constructor(
    private clienteService:ClienteService,
    private activatedRoute:ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = Number(params.get('id'));

      if(id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }

    })
  }

}
