import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage implements OnInit {

  direccionDestino: string = '';
  direccionOrigen: string = '';

  constructor(
    private toastController: ToastController,
    private firestore: Firestore,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  // Método para obtener la ubicación actual del usuario (placeholder)
  async obtenerUbicacionActual() {
    this.mostrarToast('Función de GPS aún no implementada', 'primary');
  }

  // Método para guardar los datos en Firestore
  async guardarDatos() {
    if (!this.direccionDestino || !this.direccionOrigen) {
      this.mostrarToast('Por favor, completa ambas direcciones', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Guardando ruta...',
    });
    await loading.present();

    try {
      const viajesCollection = collection(this.firestore, 'rutasPasajeros');
      await addDoc(viajesCollection, {
        destino: this.direccionDestino,
        origen: this.direccionOrigen,
        fecha: new Date().toISOString(),
      });

      this.mostrarToast('Ruta guardada con éxito', 'success');
    } catch (error) {
      this.mostrarToast('Error al guardar la ruta', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  // Método para mostrar toasts (notificaciones)
  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }
}
