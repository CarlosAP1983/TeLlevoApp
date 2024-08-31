import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController para la navegación

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = ''; // Variable para almacenar el correo electrónico
  password: string = ''; // Variable para almacenar la contraseña

  constructor(private navCtrl: NavController) {}

  // Función de inicio de sesión
  login() {
    const validUser = 'carlos'; // Usuario válido
    const validPass = '123'; // Contraseña válida

    // Verifica si las credenciales coinciden
    if (this.email.toLowerCase() === validUser && this.password === validPass) {
      console.log('Inicio de sesión exitoso');
      // Navega a la página principal o vista deseada
      this.navCtrl.navigateForward('/programar-viaje'); // Redirige a la página "programar-viaje"
    } else {
      console.log('Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos'); // Muestra una alerta de error
    }
  }

  // Función para redirigir a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/registro'); // Navega a la página de registro
  }
}
