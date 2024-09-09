import { Component } from '@angular/core';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor() {}

  // Función para enviar el enlace de restablecimiento
  enviarEnlace() {
    if (this.email) {
      // Simula el envío del enlace de restablecimiento de contraseña
      this.successMessage = 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.';
      this.errorMessage = ''; 
    } else {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      this.successMessage = ''; 
    }
  }
}
