import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/facturas/models/factura';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente!: Cliente; // El signo de exclamasion me libra de momento de inicializar
  public titulo: string = "Subir Imagen";
  //cliente:Cliente = new Cliente();
  public fotoSeleccionada!: File | any; 
  public progreso!:any;

  constructor(
    private clienteService:ClienteService,
    private activatedRoute:ActivatedRoute,
    public modalService: ModalService,
    private authService: AuthService,
    private facturasService: FacturasService
  ) {
   }

  ngOnInit(): void {
    /*   
      // Deprecated cuando se implemento el modal 
      this.activatedRoute.paramMap.subscribe(params => {
        let id:number = Number(params.get('id'));

        if(id) {
          this.clienteService.getCliente(id).subscribe(cliente => {
            this.cliente = cliente;
          })
        }
      }) 
    */
  }

  seleccionarFoto(event:any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if (this.fotoSeleccionada.type.indexOf("image") < 0) {
      this.fotoSeleccionada = null;
      Swal.fire("Error: Tipo de archivo", "Selecciona un archivo de tipo imagen", "error");
    }
  }
  

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire("Error upload", "Debe seleccionar la foto", "error");
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(
        (event:any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded/event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response:any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.getNotificarUpload().emit(this.cliente);
            Swal.fire("Subida correctamente", response.mensaje, "success");
          }
        }
      )
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  hasRole(role: string):boolean {
    return this.authService.hasRole(role);
  }

  delete(factura: Factura) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que deseas eliminar la factura ${factura.descripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

        
        this.facturasService.deleteFactura(factura.id)
          .subscribe(response => {     
            
            // Eliminar factura de la cache (artificial)
            this.cliente.facturas = this.cliente.facturas.filter(fa => fa !== factura);

            swalWithBootstrapButtons.fire(
              'Factura eliminada!',
              `Factura ${factura.descripcion} eliminada con exito.`,
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

}
