import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController para la navegación

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  username: string = ''; 
  password: string = ''; 

  constructor(private navCtrl: NavController) {}

  // Método de inicio de sesión
  onLogin() {
    const validUser = 'carlos'; 
    const validPass = '123'; 

    // Verifica si las credenciales coinciden
    if (this.username.toLowerCase() === validUser && this.password === validPass) {
      console.log('Inicio de sesión exitoso');
      // Navega a la página principal o vista deseada
      this.navCtrl.navigateForward('/programar-viaje'); 
    } else {
      console.log('Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos'); 
    }
  }
}
