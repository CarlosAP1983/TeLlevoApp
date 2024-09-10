import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage {
  ruta: any;
  mostrarSpinner: boolean = false; // Variable para controlar la visibilidad del spinner

  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    // Obtener los datos de la ruta seleccionada desde el estado de navegación
    this.ruta = history.state.ruta;
  }

  // Función para manejar la acción de "Tomar viaje"
  async tomarViaje() {
    // Mostrar el spinner
    this.mostrarSpinner = true;

    // Espera 3 segundos para simular el proceso de carga
    setTimeout(async () => {
      this.mostrarSpinner = false; // Oculta el spinner después de 3 segundos

      // Redirigir a la página de contacto con el chofer
      this.navCtrl.navigateForward('/contacto-chofer', { state: { ruta: this.ruta } });
    }, 3000);
  }
}
