import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms'; 
import {LoginResponse} from '../../../pages/auth/login/login-response.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  email='';
  password='';
  isLoaging = false;


  constructor(private router: Router, private authService: AuthService) {  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
     next: (response: LoginResponse) =>{
        console.log("Login success", response);

        //GUardar el token en el almacenaiento local
        localStorage.setItem('token', response.token);
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/home']);
      },
    error: (error) => {
        console.log("Login error:", error);
      }
  });
  }


  
  registrarse() {
      this.router.navigate(['/auth/register']);
  }

}
