import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.page.html',
  styleUrls: ['./registro-exitoso.page.scss'],
})
export class RegistroExitosoPage {
  constructor(private navCtrl: NavController) {}

  createTrip() {
    this.navCtrl.navigateForward('/programar-viaje');
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta');
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  verTusRutas() {
    this.navCtrl.navigateForward('/gestionar-tus-rutas');
  }

  cancelTrip() {
    this.navCtrl.navigateForward('/motivo-cancelacion');
  }
}
