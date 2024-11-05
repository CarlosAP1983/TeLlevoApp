import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; 

  constructor(
    private firestore: AngularFirestore, // Inyecta Firestore
    private alertController: AlertController // Inyecta AlertController
  ) {}

  // Función para mostrar Alert
  async mostrarAlert(mensaje: string, header: string = 'Información') {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['CONTINUAR']
    });
    await alert.present();
  }

  // Verificar si el correo está registrado en Firestore y enviar enlace
  async enviarEnlace() {
    if (!this.email) {
      await this.mostrarAlert('Por favor, ingresa tu correo electrónico.', 'ERROR');
      return;
    }

    try {
      // Verificar si el correo existe en la colección 'users' de Firestore
      const snapshot = await this.firestore.collection('users', ref => ref.where('email', '==', this.email)).get().toPromise();
      
      if (snapshot && !snapshot.empty) {
        // El correo está registrado en Firestore, procedemos a enviar el enlace de restablecimiento
        const auth = getAuth();
        await sendPasswordResetEmail(auth, this.email);
        await this.mostrarAlert('Se ha enviado un correo para restablecer la contraseña.', '¡ÉXITO!...');
      } else {
        // El correo no está registrado en Firestore
        await this.mostrarAlert('El correo ingresado no está asociado a una cuenta.', 'ERROR');
      }
    } catch (error: any) {
      // Manejar el error y mostrar un mensaje apropiado
      let errorMessage = 'Ocurrió un error al enviar el correo. Inténtalo nuevamente.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico ingresado no es válido.';
      }
      await this.mostrarAlert(errorMessage, 'ERROR');
    }
  }
}
