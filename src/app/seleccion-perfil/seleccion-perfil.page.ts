import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-perfil',
  templateUrl: './seleccion-perfil.page.html',
  styleUrls: ['./seleccion-perfil.page.scss'],
})
export class SeleccionPerfilPage {
  perfil: string = '';

  constructor(private navCtrl: NavController) {}

  confirmarPerfil() {
    if (this.perfil === 'conductor') {
      // Redirigir a la vista de registro de conductor
      this.navCtrl.navigateForward('/registro-exitoso');
    } else if (this.perfil === 'pasajero') {
      // Redirigir a la vista de registro de pasajero
      this.navCtrl.navigateForward('/registro-exitoso-pasajero');
    } else {
      // Si no se ha seleccionado un perfil, muestra un mensaje de error o advertencia
      alert('Por favor, selecciona un tipo de usuario.');
    }
  }
}
