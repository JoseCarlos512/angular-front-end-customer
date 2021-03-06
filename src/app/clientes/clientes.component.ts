import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public paginador: any;
  public clienteSeleccionado!: Cliente;

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
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private authService: AuthService
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

    this.modalService.getNotificarUpload().subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(clienteOriginal.id == cliente.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
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

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

  hasRole(role: string):boolean {
    return this.authService.hasRole(role);
  }

}
