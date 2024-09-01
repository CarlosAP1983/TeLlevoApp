import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  userType: string = ''; // Variable para almacenar el tipo de usuario
  errorMessage: string = '';

  constructor(private navCtrl: NavController) {}

  // Función para manejar el registro del usuario
  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.userType) {
      this.errorMessage = 'Por favor, selecciona un tipo de usuario';
      return;
    }

    // Redirigir según el tipo de usuario seleccionado
    if (this.userType === 'conductor') {
      console.log('Registro exitoso como Conductor');
      this.navCtrl.navigateForward('/registro-exitoso'); // Redirige a la vista del conductor
    } else if (this.userType === 'pasajero') {
      console.log('Registro exitoso como Pasajero');
      this.navCtrl.navigateForward('/registro-exitoso-pasajero'); // Redirige a la vista del pasajero
    }
  }
}
