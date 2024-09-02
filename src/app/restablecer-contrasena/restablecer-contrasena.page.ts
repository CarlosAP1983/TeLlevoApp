import { Component } from '@angular/core';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; // Variable para almacenar el correo electrónico
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor() {}

  // Función para enviar el enlace de restablecimiento
  enviarEnlace() {
    if (this.email) {
      // Simula el envío del enlace de restablecimiento de contraseña
      this.successMessage = 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.';
      this.errorMessage = ''; // Resetea el mensaje de error
    } else {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      this.successMessage = ''; // Resetea el mensaje de éxito
    }
  }
}
