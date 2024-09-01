import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {

  constructor(private navCtrl: NavController) {}

  // Función para cambiar de cuenta
  cambiarCuenta() {
    console.log('Cambiando de cuenta');
    this.navCtrl.navigateRoot('/home'); // Redirige al inicio para seleccionar una cuenta nueva
  }

  // Función para cerrar sesión
  cerrarSesion() {
    console.log('Cerrando sesión');
    this.navCtrl.navigateRoot('/home'); // Redirige al inicio
  }
}
