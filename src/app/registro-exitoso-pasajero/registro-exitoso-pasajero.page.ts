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
    // rutas simuladas
    { origen: 'Dirección A', destino: 'Destino A', precio: '$800' },
    { origen: 'Dirección B', destino: 'Destino B', precio: '$800' },
    { origen: 'Dirección B', destino: 'Destino B', precio: '$800' },
    
  ];

  constructor(private navCtrl: NavController) {
    this.username = history.state.username; // Obtén el nombre del usuario desde el estado de navegación
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta'); // Redirige a la página de cuenta
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario'); // Redirige a la página de perfil de usuario
  }

  verViajesDisponibles() {
    console.log('Mostrando viajes disponibles');
  }
}
