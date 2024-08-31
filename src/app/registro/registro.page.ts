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

    // Aquí puedes agregar la lógica de registro
    console.log('Registro exitoso:', {
      name: this.name,
      email: this.email,
      username: this.username,
      phone: this.phone,
      userType: this.userType, // Muestra el tipo de usuario
    });

    this.navCtrl.navigateForward('/registro-exitoso'); // Redirige a una página de confirmación
  }
}
