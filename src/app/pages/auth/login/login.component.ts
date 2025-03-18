import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  email='';
  password='';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
     next: (response) =>{
        console.log("Login success", response);
        this.router.navigate(['/home']);
      },
    error: (error) => {
        console.log("Login error", error);
        alert("Login error");
      }
  });
  }

  registrarse() {
      this.router.navigate(['/auth/register']);
  }

}
