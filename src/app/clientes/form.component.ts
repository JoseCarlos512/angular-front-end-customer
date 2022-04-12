import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  public errores: string[] = []; 
  public regiones!: Region[];

  /**
   *  Inyectar la clase service
   */
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    /**
     *  Lo mismo que el mountes ciclo de vida
     */
    this.getCliente();

    /**
     *  Regiones (Select)
     */
    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    })
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
      }, 
      err => {
        this.errores = err.error.errors as string[];
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
    this.cliente.facturas = [];
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes'])
          
        Swal.fire(
          'Actualizar cliente',
          `Cliente ${cliente.nombre} se actualizo con exito`,
          'success'
        )
      },
      err => {
        console.log("==================");
        console.log(err.error.errors)
        this.errores = err.error.errors as string[];
      });
  }

  compararRegion(o1: Region, o2:Region):boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return (o1 === null || o2 === null) || (o1 === undefined || o2 === undefined) ? false : o1.id === o2.id; 
  }
}
