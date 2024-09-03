import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    asientos: 1,
  };

  constructor(private navCtrl: NavController) {}

  // Cambia la función a "guardarViaje"
  guardarViaje() {
    console.log('Viaje guardado:', this.nuevoViaje);
    // Aquí podrías agregar lógica adicional para guardar el viaje o navegar a otra vista
    this.navCtrl.navigateForward('/esperando-pasajeros'); // Navega a la página "esperando-pasajeros"
  }
}
