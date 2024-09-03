import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gestionar-tus-rutas',
  templateUrl: './gestionar-tus-rutas.page.html',
  styleUrls: ['./gestionar-tus-rutas.page.scss'],
})
export class GestionarTusRutasPage {
  rutas: any[] = [];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {
    this.cargarRutas();
  }

  // Método para cargar rutas desde localStorage
  cargarRutas() {
    this.rutas = JSON.parse(localStorage.getItem('viajes') || '[]');
  }

  // Método para editar una ruta existente
  editTrip(index: number) {
    // Guarda la ruta seleccionada en localStorage y redirige al formulario de edición
    const rutaParaEditar = this.rutas[index];
    localStorage.setItem('rutaParaEditar', JSON.stringify(rutaParaEditar));
    this.navCtrl.navigateForward('/programar-viaje');
  }

  // Método para cancelar un viaje
  async cancelTrip(index: number) {
    // Guarda temporalmente la ruta a cancelar
    const rutaParaCancelar = this.rutas[index];
    localStorage.setItem('rutaParaEditar', JSON.stringify(rutaParaCancelar));

    // Elimina el viaje del array de rutas
    this.rutas.splice(index, 1);
    localStorage.setItem('viajes', JSON.stringify(this.rutas));

    // Redirige al usuario a la vista de motivo de cancelación
    this.navCtrl.navigateForward('/motivo-cancelacion');
  }
}
