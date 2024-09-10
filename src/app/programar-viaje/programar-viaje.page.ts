import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

interface Viaje {
  origen: string;
  destino: string;
  hora: string;
  fecha: string;
  precio: string;
  asientos: number;
}

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage {
  nuevoViaje: Viaje = {
    origen: '',
    destino: '',
    hora: '',
    fecha: '',
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

    // Guardar los detalles del viaje en localStorage
    const viajesGuardados = JSON.parse(localStorage.getItem('viajes') || '[]');
    viajesGuardados.push(this.nuevoViaje);
    localStorage.setItem('viajes', JSON.stringify(viajesGuardados));

    // Espera hasta que termine el loading
    loading.onDidDismiss().then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Viaje guardado exitosamente.',
        duration: 2000,  
        color: 'dark',
        position: 'middle',
        cssClass: 'custom-toast' 
      });
      await toast.present();
      
      // Redirigir a la vista de registro-exitoso
      this.navCtrl.navigateBack('/registro-exitoso');
    });
  }
}
