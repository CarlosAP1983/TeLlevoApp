import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',  // Cambia a cuenta.page.html
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {  // Asegúrate de que el nombre de la clase sea CuentaPage
  perfil: string = ''; // Variable para almacenar el perfil seleccionado

  constructor(private navCtrl: NavController) {}

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
      alert('Por favor, selecciona un perfil.');
    }
  }

  // Función para abrir el cambio de usuario
  abrirCambioUsuario() {
    this.navCtrl.navigateForward('/cambiar-usuario');
  }

  // Función para cerrar sesión
  cerrarSesion() {
    alert('Sesión cerrada');
    this.navCtrl.navigateRoot('/home'); // Redirigir al inicio
  }
}
