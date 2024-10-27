import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  ruta: any;
  esSolicitudPasajero: boolean = false; // Nueva propiedad para identificar si es una solicitud del pasajero
  mostrarSpinner: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    // Asignar los datos de 'history.state.ruta' y definir si es una solicitud del pasajero o no
    this.ruta = history.state.ruta;
    this.esSolicitudPasajero = history.state.esSolicitudPasajero || false; // Verificamos si es solicitud del pasajero
  }

  ngOnInit() {}

  // Método para aceptar la solicitud o tomar el viaje, según corresponda
  async aceptarSolicitud() {
    this.mostrarSpinner = true; // Activar el spinner

    setTimeout(async () => {
      this.mostrarSpinner = false; // Desactivar el spinner

      // Redirigir a la vista correspondiente
      if (this.esSolicitudPasajero) {
        this.navCtrl.navigateForward('/contacto-pasajero', { state: { solicitud: this.ruta } });
        this.mostrarToast("Solicitud del pasajero aceptada.");
      } else {
        this.navCtrl.navigateForward('/contacto-chofer', { state: { ruta: this.ruta } });
        this.mostrarToast("Viaje aceptado.");
      }
    }, 3000);
  }

  // Método para mostrar el toast de confirmación
  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
