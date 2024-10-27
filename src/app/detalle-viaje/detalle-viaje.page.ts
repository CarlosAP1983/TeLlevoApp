import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  ruta: any;
  mostrarSpinner: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.ruta = history.state.ruta;
  }

  ngOnInit() {}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async tomarViaje() {
    this.mostrarSpinner = true;
    setTimeout(async () => {
      this.mostrarSpinner = false;
      this.navCtrl.navigateForward('/contacto-chofer', { state: { ruta: this.ruta } });
    }, 3000);
  }
}
