import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage {
  rutasDisponibles = [
    { origen: 'Sede', destino: 'Providencia', precio: '$1000', conductor: 'Juan Pedro', hora: '22:30', AsientosDisponibles: 2 },
    { origen: 'Sede', destino: 'Quinta Normal', precio: '$800', conductor: 'Ana Gabriela', hora: '21:20', AsientosDisponibles: 3 }
  ];

  rutaSeleccionada: any;
  mostrarSpinner: boolean = false;

  constructor(private navCtrl: NavController) {}

  // Función para navegar a la página de la cuenta
  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta');
  }

  // Función para navegar a la página de perfil del usuario
  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  // Función para crear una nueva solicitud de viaje
  crearSolicitud() {
    this.navCtrl.navigateForward('/programar-viaje-pasajero');
  }

  selectRuta(ruta: any) {
    this.rutaSeleccionada = ruta;
  }

  verDetallesViaje() {
    if (this.rutaSeleccionada) {
      this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: this.rutaSeleccionada } });
    }
  }

  recargarRutas() {
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 2000);
  }
}
