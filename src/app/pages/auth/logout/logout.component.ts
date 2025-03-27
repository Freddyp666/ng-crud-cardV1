import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.sass'
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) { 
    this.performLogout();
  }

  private performLogout(): void {

    //Llamar al servicio de logout
    this.authService.logout();

    //Redirigir al login
   setTimeout(() => {
      this.router.navigate(['/login']);
      }, 2000);
  }

}
