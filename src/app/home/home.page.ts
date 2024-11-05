import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private alertController: AlertController // Inyecta AlertController
  ) {}

  // Mostrar Alert
  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'ERROR DE INGRESO',
      message: mensaje,
      buttons: ['CONTINUAR']
    });
    await alert.present();
  }

  // Inicio de sesión
  async iniciarSesion() {
    if (this.nombreUsuario && this.contrasena) {
      try {
        await this.loginService.login(this.nombreUsuario, this.contrasena);
        this.navCtrl.navigateForward('/seleccion-perfil');
      } catch (error) {
        // Mostrar Alert en lugar del Toast
        await this.mostrarAlert('Usuario o contraseña incorrecta.');
      }
    } else {
      await this.mostrarAlert('Por favor, ingresa tu usuario y contraseña.');
    }
  }

  // Ir a la página de registro
  irARegistro() {
    this.navCtrl.navigateForward('/registro');
  }
}
