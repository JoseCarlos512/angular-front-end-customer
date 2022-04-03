import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { ClienteService } from '../clientes/cliente.service';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { Producto } from './models/producto';
import { FacturasService } from './services/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  productosFiltrados!: Observable<Producto[]>;
  
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturasService: FacturasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:any) => {
      let clientId = +params.get('clienteId');
      console.log("clientId: " + clientId)
      this.clienteService.getCliente(clientId).subscribe(cliente => {
        this.factura.cliente = cliente; 
      })
    })

    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : []),
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarProductos(filterValue);
  }

  monstrarNombre(producto?: Producto): string|undefined|any {
    return producto?producto.nombre:undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent):void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarCantidad(id:number, event:any): void {
    let cantidad:number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    
    this.factura.items = this.factura.items.map((item:ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    })
  }

  existeItem(id:number):boolean {
    let existe = false;
    this.factura.items.forEach((item:ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    })
    return existe;
  }

  incrementaCantidad(id:number):void {
    this.factura.items = this.factura.items.map((item:ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad
      }
      return item;
    })
  }

  eliminarItemFactura(id:number):void{
    this.factura.items = this.factura.items.filter((item:ItemFactura) => id !== item.producto.id)
  }

  create():void {
    this.facturasService.create(this.factura).subscribe(factura => {
      Swal.fire(this.titulo, `Factura ${factura.descripcion} creada con exito`, 'success');
      this.router.navigate(['/clientes']);
    })
  }
}
