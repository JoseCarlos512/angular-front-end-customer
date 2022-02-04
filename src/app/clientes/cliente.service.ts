import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPointGet: string = 'http://localhost:8080/api/clientes';
  private urlEndPointTransaction: string = 'http://localhost:8080/api/cliente';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
     //return of(CLIENTES);
     return this.http.get<Cliente[]>(this.urlEndPointGet).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPointTransaction, cliente, {headers: this.httpHeaders})
  }

  getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointTransaction}/${id}`)
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPointTransaction}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPointTransaction}/${id}`, {headers: this.httpHeaders})
  }
}
