import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular'; // Importa ToastController
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',  // Cambia a cuenta.page.html
  styleUrls: ['./cuenta.page.scss'],
})

export class CuentaPage {  // Asegúrate de que el nombre de la clase sea CuentaPage
  
  perfil: string = ''; // Variable para almacenar el perfil seleccionado

  constructor(
    private navCtrl: NavController, 
    private toastController: ToastController,
    private loginService: LoginService
  ) {} // Añade ToastController al constructor

  // Función para seleccionar el perfil
  seleccionarPerfil(tipo: string) {
    this.perfil = tipo;
  }

  // Función para confirmar el perfil y redirigir a la vista correspondiente
  confirmarPerfil() {
    if (this.perfil === 'conductor') {
      this.navCtrl.navigateForward('/registro-exitoso');
    } else if (this.perfil === 'pasajero') {
      this.navCtrl.navigateForward('/registro-exitoso-pasajero');
    } else {
      this.mostrarToast('Por favor, selecciona un perfil.');
    }
  }

  // Función para abrir el cambio de usuario
  abrirCambioUsuario() {
    this.navCtrl.navigateForward('/cambiar-usuario');
  }

  // Función para cerrar sesión
  async cerrarSesion() {
    try {
      await this.loginService.logout();  // Llamamos al método logout del LoginService para cerrar sesión correctamente
      const toast = await this.toastController.create({
        message: 'Sesión cerrada correctamente.',
        duration: 2000, // Duración del Toast en milisegundos
        position: 'bottom'
      });
      await toast.present();
      this.navCtrl.navigateRoot('/home');  // Redirigir al inicio después de cerrar sesión
    } catch (error) {
      // Mostrar mensaje de error si no se puede cerrar sesión
      await this.mostrarToast('Error al cerrar sesión. Intenta nuevamente.');
    }
  }

  // Función para mostrar un Toast personalizado
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();
  }
}

