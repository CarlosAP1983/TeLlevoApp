import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; // Variable para almacenar el correo electrónico del usuario

  constructor(private navCtrl: NavController) {}

  // Función para enviar el enlace de restablecimiento de contraseña
  enviarEnlace() {
    if (!this.email) {
      alert('Por favor, introduce tu correo electrónico');
      return;
    }

    console.log('Enlace de recuperación enviado a:', this.email);
    alert('El enlace de recuperación ha sido enviado a tu correo electrónico');
    this.navCtrl.navigateRoot('/home'); // Redirige a la página de inicio después de enviar el enlace
  }
}
