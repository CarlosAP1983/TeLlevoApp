import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage {
  nuevoViaje = {
    origen: '',
    destino: '',
    hora: '',
    fecha: '',
    precio: '',
    asientos: 0
  };

  constructor(private navCtrl: NavController) {}

  guardarViaje() {
    // Guardar el nuevo viaje en localStorage o en una base de datos
    const viajesGuardados = JSON.parse(localStorage.getItem('viajes') || '[]');
    viajesGuardados.push(this.nuevoViaje);
    localStorage.setItem('viajes', JSON.stringify(viajesGuardados));

    // Redirigir al usuario a la vista principal o de confirmación
    this.navCtrl.navigateBack('/registro-exitoso');
  }
}
