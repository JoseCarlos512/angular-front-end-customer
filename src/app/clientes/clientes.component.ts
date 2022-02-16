import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador: any;

  /**
   * Abreviatura: private clienteService: ClienteService
   *  private clienteService;
   *  
   *  constructor (clienteService: ClienteService) {
   *    this.clienteService = clienteService;
   *  }
   * 
   */
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  public delete(id: number): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "¿Seguro que deseas eliminar el cliente?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

        this.clientes = this.clientes.filter(customer => customer.id !== id);
        this.clienteService.delete(id)
          .subscribe(response => {        
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              'Cliente eliminado con exito.',
              'success'
            )
        });  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Transaccion cancelada',
          'error'
        )
      }
    })

    

  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = Number(params.get('page'));

      page = !page ? 0 : page;
       
      this.clienteService.getClientes(page).subscribe(
        response => {
          this.clientes = (response.content as Cliente[])
          this.paginador = response;
        }
      );
    })
    
    
  }

  

  /*ngOnInit() {
    let page = 0;
    this.clienteService.getClientes(page)
    .pipe(
      tap( response => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(response => this.clientes = response.content as Cliente[]);
  }*/

}
