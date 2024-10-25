import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage {
  nuevoViaje: any = {
    origen: '',
    destino: '',
    hora: '',
    fecha: ''
  };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: Firestore  // Conexión a Firestore
  ) {}

  async guardarViaje() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando solicitud...',
      duration: 2000  
    });

    await loading.present();

    try {
      const viajesCollection = collection(this.firestore, 'solicitudesViajes');
      await addDoc(viajesCollection, this.nuevoViaje);

      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Solicitud creada exitosamente.',
        duration: 2000,
        color: 'success',
        position: 'middle'
      });
      await toast.present();
      
      this.navCtrl.navigateBack('/registro-exitoso-pasajero');
    } catch (error) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error al crear la solicitud.',
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      await toast.present();
    }
  }
}
