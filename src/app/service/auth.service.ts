import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
    token: string;

}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth/login';
    private tokenKey="auth-token";

    constructor(private http: HttpClient, private router: Router) {}

    //Metodo login que recibe el email y la contraseña y devuelve un observable de tipo AuthResponse
    login(email: string, password: string): Observable<AuthResponse> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<AuthResponse>(this.apiUrl, { email, password }, { headers });
    }

      // Ejemplo de cómo incluir el token en los headers de autorización
  getProtectedResource(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log("Headers", headers); // Verificar que el token se está incluyendo

    return this.http.get('http://localhost:8080/api/protected', { headers }); // Reemplaza con tu endpoint protegido
  }

  logout(): void {

    // Eliminar el token del almacenado local
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/auth/login']);
  }





}
