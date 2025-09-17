import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html', // usa el archivo que ya tienes login.html
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  // estado para mostrar/ocultar contraseña
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  // método que alterna el estado
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email y contraseña son obligatorios';
      return;
    }

    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.successMessage = 'Login exitoso! Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = err.error?.error || 'Error en el login';
      },
    });
  }
}
