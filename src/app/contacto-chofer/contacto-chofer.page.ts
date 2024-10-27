import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto-chofer',
  templateUrl: './contacto-chofer.page.html',
  styleUrls: ['./contacto-chofer.page.scss'],
})
export class ContactoChoferPage {
  ruta: any;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private toastCtrl: ToastController) {
    // Obtener los datos de la ruta seleccionada desde el estado de navegación
    this.ruta = history.state.ruta;
  }

  // Función para contactar al chofer
  async contactarChofer() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha contactado al chofer.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}

