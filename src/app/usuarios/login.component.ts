import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public titulo:string = 'Por favor Sign In!';
  public usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Se puede hacer tbm donde se creo, da los mismo
    // mas elegante en el constructor 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
        Swal.fire('Login', 'Hola ' + this.authService.getUsuario().username + ' ya estas autenticado!', 'info');
        this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire("Error", "Username o Password vacias", "error");
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response);

        /**
         * Guardar el token y el usuario
         */
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.getUsuario();

        this.router.navigate(['/clientes']);
        Swal.fire('Login', 'Hola ' + usuario.username + ' has iniciado sesion con exito', 'success')
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error login', 'Usuario o clave incorrecta!', 'error')
        }
      }
    );
  }

}
