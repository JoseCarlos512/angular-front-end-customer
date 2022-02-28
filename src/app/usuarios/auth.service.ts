import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario!: Usuario | null;
  private token!: string | null;
  /** 
   * Agregarlo como parametro de entrada del constructor 
   * es como decir que se declaro fuera y se esta inicializando
   * dentro del contructor {} 
   */
  constructor(private http: HttpClient) { }

  public getUsuario():Usuario {

    const objUsuarioSession = sessionStorage.getItem('usuario');

    if (this.usuario != null){
      return this.usuario;
    } else if (this.usuario == null && objUsuarioSession != null) {
      this.usuario = JSON.parse(objUsuarioSession) as Usuario;
      return this.usuario;
    }
    return new Usuario();
  }

  public getToken():string | null {
    
    const mObjTokenSession = sessionStorage.getItem('token');

    if (this.token != null){
      return this.token;
    } else if (this.token == null && mObjTokenSession != null) {
      this.token = mObjTokenSession;
      return this.token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    
    /**
     * Credenciales de la aplicacion
     */
    const credenciales = btoa('angularapp' + ':' + '12345')
    const httpHeaders = new HttpHeaders(
                                        {
                                          'Content-Type': 'application/x-www-form-urlencoded',
                                          'Authorization': 'Basic ' + credenciales
                                        }
                                      ); 

    /**
     * Credenciales de usuario registrado en la bd
     * la variable params que almacena los crenciales
     * almacena la informacion en un tipo de urlencoded
     * lo que falta para poder mandarla al endpoint es
     * transformarlo a cadena con toString();
     */
    let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', usuario.username);
        params.set('password', usuario.password);
                                        
        console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  logout(): void {
    this.token = null;
    this.usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('token')
  }

  guardarUsuario(accessToken: string): void {
    let mObjPayload = this.obtenerDatosToken(accessToken);

    /**
     * Almacenar la informacion recogida en el objeto usuario
     */
    this.usuario = new Usuario();
    this.usuario.nombre   = mObjPayload.nombre;
    this.usuario.apellido = mObjPayload.apellido;
    this.usuario.email    = mObjPayload.email;
    this.usuario.username = mObjPayload.user_name;
    this.usuario.roles    = mObjPayload.authorities;
    
    // stringify: Transforma el objeto o json en json plano
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario))
  }

  guardarToken(accessToken: string): void {
    this.token = accessToken;
    
    /**
     * Almacenar el token en session
     */
    sessionStorage.setItem('token', this.token);
  }

  obtenerDatosToken(accessToken: string | null): any {
    if (accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    
    let mObjPayload = this.obtenerDatosToken(this.getToken());
    if (mObjPayload != null ) {
      if (mObjPayload.user_name && mObjPayload.user_name.length > 0) {
        return true;
      }
    }
    return false;
  }
}
