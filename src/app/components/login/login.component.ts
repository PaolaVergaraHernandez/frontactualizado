import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule y NgForm
import { Router } from '@angular/router'; // Importa Router

import {
  AuthService,
} from '../../services/auth.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true, // Si tu componente es standalone
  imports: [FormsModule, CommonModule], // Añade FormsModule y CommonModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = ''; // Limpiar cualquier mensaje de error previo

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa email y contraseña.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login con Firebase y backend exitoso:', response);
        // Si el login es exitoso (Firebase + Backend), redirige al área de administrador
        this.router.navigate(['/admin/productos']);
      },
      error: (error) => {
        console.error('*** ERROR COMPLETO EN LOGIN (FRONTEND):', error);
        // Manejo de errores de autenticación
        if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
        } else if (error.error && error.error.message) {
          // Errores del backend
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.';
        }
      }
    });
  }
}