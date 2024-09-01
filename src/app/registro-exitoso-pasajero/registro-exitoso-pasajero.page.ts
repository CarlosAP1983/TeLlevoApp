import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage {
  username: string = ''; // Variable para almacenar el nombre de usuario
  rutasDisponibles = [
    
    { origen: 'Dirección A', destino: 'Destino A', precio: '$800' },
    { origen: 'Dirección B', destino: 'Destino B', precio: '$800' },
    { origen: 'Dirección B', destino: 'Destino B', precio: '$800' },
    // Añade más rutas simuladas
  ];

  constructor(private navCtrl: NavController) {
    this.username = history.state.username; // Obtén el nombre del usuario desde el estado de navegación
  }

  verViajesDisponibles() {
    console.log('Mostrando viajes disponibles');
  }

  goToEditUser() {
    this.navCtrl.navigateForward('/editarUsuario'); // Redirige a la página de edición del usuario
  }

  changeUserOrLogout() {
    console.log('Cambiando usuario o cerrando sesión');
  }
}
