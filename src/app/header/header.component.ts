import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{  
    
    public isAutenticated!: boolean;

    constructor(
        public authService: AuthService,
        private router: Router
    ) {
        
    }


    ngOnInit(): void {
        this.isAutenticated = this.authService.isAuthenticated();
    }

    cerrarSession() {
        let username = this.authService.getUsuario().username;
        this.authService.logout();
        Swal.fire('Logout', username +': Ha cerrado la session del usuario correctamente!', 'success');
        this.router.navigate(['/login'])
    }
}