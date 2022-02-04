import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  /**
   *  Inyectar la clase service
   */
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    /**
     *  Lo mismo que el mountes ciclo de vida
     */
    this.getCliente();
  }

  public create(): void{
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        
        Swal.fire(
          'Nuevo cliente',
          `Cliente ${cliente.nombre} se creado con exito`,
          'success'
        )
      });

  }

  public getCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  public actualizar(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
          
        Swal.fire(
          'Actualizar cliente',
          `Cliente ${cliente.nombre} se actualizo con exito`,
          'success'
        )
      }
    )
  }
}
