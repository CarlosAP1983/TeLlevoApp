import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage {
  nuevoViaje: any = {
    origen: '',
    destino: '',
    fecha: '',
    hora: ''
  };

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async crearSolicitud() {
    if (!this.nuevoViaje.origen || !this.nuevoViaje.destino || !this.nuevoViaje.fecha || !this.nuevoViaje.hora) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Guardando solicitud...'
    });
    await loading.present();

    try {
      await this.firestore.collection('solicitudesPasajeros').add(this.nuevoViaje);
      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Solicitud creada exitosamente.',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.navCtrl.navigateBack('/registro-exitoso-pasajero');
    } catch (error) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error al crear la solicitud. Inténtelo de nuevo.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
