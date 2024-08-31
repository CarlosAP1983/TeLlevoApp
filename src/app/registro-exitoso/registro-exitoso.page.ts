import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.page.html',
  styleUrls: ['./registro-exitoso.page.scss'],
})
export class RegistroExitosoPage {
  currentLocation: string = ''; // Variable para la dirección actual
  destination: string = ''; // Variable para el destino
  price: number = 0; // Variable para el precio

  constructor(private navCtrl: NavController) {}

  // Función para redirigir a la vista de editar usuario
  goToEditUser() {
    this.navCtrl.navigateForward('/editarUsuario'); // Redirige a la página de edición del usuario
  }

  // Función para cambiar de usuario o cerrar sesión
  changeUserOrLogout() {
    // Aquí puedes agregar la lógica para cambiar de usuario o cerrar sesión
    console.log('Usuario o sesión cambiada');
  }

  // Función para crear un viaje
  createTrip() {
    console.log('Viaje creado:', this.currentLocation, this.destination, this.price);
    // Redirige a la vista donde se esperan pasajeros
    this.navCtrl.navigateForward('/esperando-pasajeros');
  }

  // Función para cancelar un viaje
  cancelTrip() {
    console.log('Viaje cancelado');
    // Aquí puedes agregar la lógica para cancelar el viaje
  }
}
