import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public titulo: string = "Subir Imagen";
  cliente:Cliente = new Cliente();
  private fotoSeleccionada!: File; 

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

  seleccionarFoto(event:any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(
      cliente => {
        this.cliente = cliente;
        Swal.fire("Subida correctamente", "La foto se ha subido correctamente: " + this.cliente.foto, "success");
      }
    )
  }

}
