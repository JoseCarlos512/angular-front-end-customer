import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { map, Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPointGet: string = 'http://localhost:8080/api/clientes';
  private urlEndPointTransaction: string = 'http://localhost:8080/api/cliente';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private isNotAuthorizado(e:any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getClientes(page:number) : Observable<any> {
     //return of(CLIENTES);
     return this.http.get(this.urlEndPointGet + '/page/' + page).pipe(
      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
          
          /**
           *  Manipular la informacion y convertir en mayuscula 
           *  el nombre y el apellido
           */
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
          return cliente;
        })
        /**
         *  Siempre retornar la informacion del mapa 
         *  de lo contrario estaras en una encruzijada
         *  de que el mapeo se esta realizando bien
         *  pero la informacion devuelta no se muestra!
         */
        return response;
      })
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPointTransaction, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {
        
        if (this.isNotAuthorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        } 

        console.log(e)
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointTransaction}/${id}`).pipe(
      catchError(e => {

        if (this.isNotAuthorizado(e)) {
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        /**
         * "Error al editar", e.error.mensaje, 'error'
         */

        Swal.fire(
          e.error.mensaje, e.error.error, 'error'
        )

        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPointTransaction}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente),
        catchError(e => {

          if (this.isNotAuthorizado(e)) {
            return throwError(e);
          }
          
          if (e.status == 400) {
            return throwError(e);
          } 

          Swal.fire(
            e.error.mensaje, e.error.error, 'error'
          )

          return throwError(e);
        })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPointTransaction}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if (this.isNotAuthorizado(e)) {
          return throwError(e);
        }

        Swal.fire(
          e.error.mensaje, e.error.error, 'error'
        )
        return throwError(e);
      })
    )
  }

  
  /**
    pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.error);
        Swal.fire(
          e.error.mensaje, e.error.error, 'error'
        )
        return throwError(e);
      })
    );
   */

  subirFoto(archivo: File, id:any): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPointTransaction}/upload/`, formData, {
      reportProgress: true
    });

    /**
     *  Este apartado generaba error porque lo que se retornaba, no se
     * estaba garantizandoque seria del tipo HttpEvent<{}> el cual indica
     * la funcion.
     */
    return this.http.request<HttpEvent<{}>>(req)
    .pipe(
      catchError(e => {
        this.isNotAuthorizado(e);
        return throwError(e);
      })
    );
  }

  /**
   * Manejo de error
   */
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPointGet + '/regiones').pipe(
      catchError(e => {
        this.isNotAuthorizado(e);
        return throwError(e);
      }) 
    )
  }
}
