import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    const validUsers = [
      { username: 'carlos', password: '123', redirectTo: '/registro-exitoso-pasajero' },
      { username: 'alan', password: '123', redirectTo: '/registro-exitoso' }
    ];

    const user = validUsers.find(
      (u) => u.username === this.email.toLowerCase() && u.password === this.password
    );

    if (user) {
      console.log('Inicio de sesión exitoso');
      // Navega a la página correspondiente pasando el nombre del usuario
      this.navCtrl.navigateForward(user.redirectTo, { state: { username: user.username } });
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
