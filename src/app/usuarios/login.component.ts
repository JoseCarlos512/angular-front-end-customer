import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public titulo:string = 'Por favor Sign In!';
  public usuario: Usuario;

  constructor() {
    // Se puede hacer tbm donde se creo, da los mismo
    // mas elegante en el constructor 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire("Error", "Username o Password vacias", "error");
      return;
    }
  }

}
