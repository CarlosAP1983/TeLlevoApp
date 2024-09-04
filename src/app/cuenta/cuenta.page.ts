import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {
  currentUser: any = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  // Función para abrir el alert de cambio de usuario
  async abrirCambioUsuario() {
    const alert = await this.alertCtrl.create({
      header: 'Selecciona el tipo de usuario:',
      cssClass: 'custom-alert', // Clase personalizada para el alert
      buttons: [
        {
          text: 'Usuario Conductor',
          cssClass: this.currentUser.perfil === 'conductor' ? 'selected-button' : '',
          handler: () => {
            this.currentUser.perfil = 'conductor';
            this.guardarCambios();
          }
        },
        {
          text: 'Usuario Pasajero',
          cssClass: this.currentUser.perfil === 'pasajero' ? 'selected-button' : '',
          handler: () => {
            this.currentUser.perfil = 'pasajero';
            this.guardarCambios();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'dark'
        }
      ]
    });

    await alert.present();
  }

  // Función para guardar los cambios y redirigir
  guardarCambios() {
    // Guardar cambios en localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));

    // Redirigir a la vista correspondiente
    if (this.currentUser.perfil === 'conductor') {
      this.navCtrl.navigateRoot('/registro-exitoso'); // Redirige a la vista del conductor
    } else if (this.currentUser.perfil === 'pasajero') {
      this.navCtrl.navigateRoot('/registro-exitoso-pasajero'); // Redirige a la vista del pasajero
    }
  }

  // Función para cerrar sesión
  cerrarSesion() {
    console.log('Cerrando sesión');
    localStorage.removeItem('loggedInUser'); // Elimina el usuario logueado del localStorage
    this.navCtrl.navigateRoot('/home'); // Redirige al inicio
  }
}
