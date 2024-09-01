import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.page.html',
  styleUrls: ['./registro-exitoso.page.scss'],
})
export class RegistroExitosoPage {
  username: string = ''; // Variable para almacenar el nombre de usuario
  currentLocation: string = ''; // Ubicación actual
  destination: string = ''; // Destino del viaje
  price: number = 0; // Precio por persona

  constructor(private navCtrl: NavController) {
    this.username = history.state.username; // Obtén el nombre del usuario desde el estado de navegación
  }

  // Función para redirigir a la página de edición del usuario
  goToEditUser() {
    this.navCtrl.navigateForward('/editarUsuario');
  }

  // Función para cambiar de usuario o cerrar sesión
  changeUserOrLogout() {
    console.log('Cambiando usuario o cerrando sesión');
    // Lógica para cambiar de usuario o cerrar sesión
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
    // Lógica para cancelar el viaje
  }
}
