import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { flatMap, map, Observable, startWith } from 'rxjs';
import { ClienteService } from '../clientes/cliente.service';
import { Factura } from './models/factura';
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
  productos: string[] = ['Horno', 'Mesa', 'Silla'];
  productosFiltrados!: Observable<Producto[]>;
  
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturasService: FacturasService
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

}
