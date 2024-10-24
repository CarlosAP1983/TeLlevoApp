import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage {
  nuevoViaje = {
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    precio: '',
    asientos: 1
  };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async guardarViaje() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando datos...',
      duration: 2000
    });

    await loading.present();

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'viajes'), this.nuevoViaje); // Guardar viaje en Firestore

      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Viaje guardado exitosamente.',
        duration: 2000,
        color: 'dark',
        position: 'middle',
        cssClass: 'custom-toast'
      });
      await toast.present();

      this.navCtrl.navigateBack('/registro-exitoso');
    } catch (error) {
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar el viaje.',
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      await toast.present();
    }
  }
}
