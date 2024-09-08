import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage {
  username: string = ''; // Variable para almacenar el nombre de usuario
  rutaSeleccionada: any; // Variable para almacenar la ruta seleccionada
  mostrarSpinner: boolean = false; // Variable para controlar la visibilidad del spinner
  rutasDisponibles = [
    { origen: 'Sede', destino: 'Providencia', precio: '$1000', conductor: 'Juan Pedro', hora: '22:30', AsientosDisponibles: 2 },
    { origen: 'Sede', destino: 'Quinta Normal', precio: '$800', conductor: 'Ana Gabriela', hora: '21:20', AsientosDisponibles: 3 },
    { origen: 'Plaza Maipu', destino: 'Estacion Central', precio: '$800', conductor: 'Luis Rey', hora: '22:45', AsientosDisponibles: 1 },
    { origen: 'Sede', destino: 'Lo Prado', precio: '$800', conductor: 'Maria Magdalena', hora: '21:50', AsientosDisponibles: 3 },
  ];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {
    this.username = history.state.username || 'Carlos'; // Obtén el nombre del usuario desde el estado de navegación o usa un valor predeterminado
  }

  selectRuta(ruta: any) {
    this.rutaSeleccionada = ruta; // Almacena la ruta seleccionada
  }

  verDetallesViaje() {
    if (this.rutaSeleccionada) {
      // Navega a la página de detalle de viaje pasando los datos de la ruta seleccionada
      this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: this.rutaSeleccionada } });
    } else {
      this.mostrarToast('Por favor, selecciona un viaje para ver los detalles.', 'danger');
    }
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta'); // Redirige a la página de cuenta
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario'); // Redirige a la página de perfil de usuario
  }

  async recargarRutas() {
    // Mostrar el spinner
    this.mostrarSpinner = true;

    // Ocultar el spinner después de 3 segundos
    setTimeout(async () => {
      this.mostrarSpinner = false;

      // Mostrar un toast de rutas actualizadas
      const toast = await this.toastCtrl.create({
        message: 'Rutas actualizadas.',
        duration: 2000,
        position: 'middle',
        color: 'success'
      });
      await toast.present();
    }, 3000);
  }

  // Función para mostrar un Toast personalizado
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: color // Usa el color pasado como parámetro
    });

    await toast.present();
  }
}
