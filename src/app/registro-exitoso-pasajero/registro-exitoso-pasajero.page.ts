import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage {
  username: string = ''; // Variable para almacenar el nombre de usuario
  rutaSeleccionada: any; // Variable para almacenar la ruta seleccionada
  rutasDisponibles = [
    { origen: 'Sede', destino: 'Providencia', precio: '$1000', conductor: 'Juan Pedro', hora: '22:30', AsientosDisponibles: 2 },
    { origen: 'Sede', destino: 'Quinta Normal', precio: '$800', conductor: 'Ana Gabriela', hora: '21:20', AsientosDisponibles: 3 },
    { origen: 'Plaza Maipu', destino: 'Estacion Central', precio: '$800', conductor: 'Luis Rey', hora: '22:45', AsientosDisponibles: 1 },
    { origen: 'Sede', destino: 'Lo Prado', precio: '$800', conductor: 'Maria Magdalena', hora: '21:50', AsientosDisponibles: 3 },
  ];

  constructor(private navCtrl: NavController) {
    this.username = history.state.username || 'Carlos'; // Obtén el nombre del usuario desde el estado de navegación o usa un valor predeterminado
  }

  selectRuta(ruta: any) {
    this.rutaSeleccionada = ruta; // Almacena la ruta seleccionada
  }

  verDetallesViaje() {
    if (this.rutaSeleccionada) {
      this.navCtrl.navigateForward('/detalle-viaje', {
        state: { ruta: this.rutaSeleccionada } // Pasa la ruta seleccionada a la vista de detalles
      });
    } else {
      alert('Por favor, seleccione un viaje para ver los detalles.');
    }
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta'); // Redirige a la página de cuenta
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario'); // Redirige a la página de perfil de usuario
  }
}
