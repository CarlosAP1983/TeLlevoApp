import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service';  // Asegúrate de inyectar el servicio de Toast

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; 

  constructor(private toastService: ToastService) {}  // Inyecta el servicio de Toast

  // Función para enviar el enlace de restablecimiento
  async enviarEnlace() {
    const auth = getAuth();

    if (!this.email) {
      // Si el campo de correo está vacío, mostramos un mensaje de error
      this.toastService.mostrarToast('Por favor, ingresa tu correo electrónico.');  // Muestra un toast con el error
      return;
    }

    try {
      // Enviar el enlace de restablecimiento de contraseña
      await sendPasswordResetEmail(auth, this.email);
      this.toastService.mostrarToast('Se ha enviado un correo para restablecer la contraseña.');  // Muestra un toast con el mensaje de éxito
    } catch (error: any) {
      // Manejar el error y mostrar un mensaje apropiado
      let errorMessage = '';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo electrónico.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico ingresado no es válido.';
          break;
        default:
          errorMessage = 'Ocurrió un error al enviar el correo. Inténtalo nuevamente.';
      }
      this.toastService.mostrarToast(errorMessage);  // Muestra un toast con el error
    }
  }
}
