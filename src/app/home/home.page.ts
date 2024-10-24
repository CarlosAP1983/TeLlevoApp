import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';  // Servicio de Toast inyectado

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
    private toastService: ToastService  // Servicio de Toast inyectado
  ) {}

  // Inicio de sesión
  async iniciarSesion() {
    if (this.nombreUsuario && this.contrasena) {
      try {
        await this.loginService.login(this.nombreUsuario, this.contrasena);
        this.navCtrl.navigateForward('/seleccion-perfil');
      } catch (error) {
        // Mostrar el toast en el componente
        await this.toastService.mostrarToast('Error: Usuario o contraseña incorrecta. Intenta nuevamente.');
      }
    } else {
      await this.toastService.mostrarToast('Error: Por favor, ingresa tu usuario y contraseña.');
    }
  }

  // Ir a la página de registro
  irARegistro() {
    this.navCtrl.navigateForward('/registro');
  }
}
