import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-perfil',
  templateUrl: './seleccion-perfil.page.html',
  styleUrls: ['./seleccion-perfil.page.scss'],
})
export class SeleccionPerfilPage {
  perfil: string = ''; //Variable para almacenar el perfil seleccionado

  constructor(private navCtrl: NavController) {}

  //Funcion para seleccionar el perfil
  seleccionarPerfil(tipo: string) {
    this.perfil = tipo;
  }

  //Funcion para confirmar el perfil y redirigir a la vista correspondiente
  confirmarPerfil() {
    if (this.perfil === 'conductor') {
      this.navCtrl.navigateForward('/registro-exitoso');
    } else if (this.perfil === 'pasajero') {
      this.navCtrl.navigateForward('/registro-exitoso-pasajero');
    } else {
      alert('Por favor, selecciona un perfil.');
    }
  }
}
